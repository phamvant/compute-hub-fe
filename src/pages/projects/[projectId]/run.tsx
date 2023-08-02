import { Button, Flex, Heading, Progress, Text, VStack } from '@chakra-ui/react'
import Container from 'components/Container'
import DataWithLabel from 'components/DataWithLabel'
import { DotIcon, LoadingIcon } from 'components/Icons'
import { Author } from 'components/ProjectCard/States'
import Logs, { LogsProps } from 'components/Table/Logs'
import { getProjectById, getProjectReport } from 'helpers/apis'
import { getNumberOfOutputByUserId } from 'helpers/compute'
import { getPresignedUrl } from 'libs/aws'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Script from 'next/script'
import { useEffect, useState, useRef } from 'react'
import { useStopwatch } from 'react-timer-hook'
import animations from 'theme/animations'
import { formatStopWatch } from 'utils/formatData'
import { ReportStatus, calculate } from 'helpers/compute'
import { useSession } from 'next-auth/react'

declare global {
  interface Window {
    bundle: any
    volunteer: any
  }
}

enum Status {
  LOADING = 'Loading bundle...',
  DISCONNECTED = 'Disconnected',
  RUNNING = 'Running',
  ERROR = 'Error',
  READY = 'Ready'
}

const statusColor = {
  [Status.LOADING]: 'gray.500',
  [Status.DISCONNECTED]: 'red.500',
  [Status.RUNNING]: 'green.500',
  [Status.ERROR]: 'red.500',
  [Status.READY]: 'yellow.500'
}

const MAX_SCRIPTS = 2

const initialStatus: ReportStatus = {
  totalOutput: 0,
  cpuTime: 0,
  dataTransferTime: 0,
  nbItems: 0,
  throughput: 0,
  throughputs: [],
  throughputStats: {
    average: 0,
    'standard-deviation': 0,
    maximum: 0,
    minimum: 0
  },
  cpuUsage: 0,
  cpuUsages: [],
  cpuUsageStats: {
    average: 0,
    'standard-deviation': 0,
    maximum: 0,
    minimum: 0
  },
  dataTransferLoad: 0,
  dataTransferLoads: [],
  dataTransferStats: {
    average: 0,
    'standard-deviation': 0,
    maximum: 0,
    minimum: 0
  }
}

const RunProject = ({
  bundleFile,
  project,
  environment
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [restarting, setRestarting] = useState<boolean>(false)
  const [status, setStatus] = useState<Status>(Status.LOADING)
  const [numOfScriptLoaded, setNumOfScriptLoaded] = useState<number>(0)
  const [logs, setLogs] = useState<LogsProps['data']>([] as LogsProps['data'])
  const {
    seconds,
    minutes,
    hours,
    start: startStopWatch,
    pause,
    reset
  } = useStopwatch()
  const [reportStatus, setReportStatus] = useState<ReportStatus>(initialStatus)
  const [submitState, setSubmitState] = useState(false)
  const socketRef = useRef<WebSocket | null>(null)
  const { data: session } = useSession()
  const { bucketId } = project

  const userId = session?.user.id
  const userName = session?.user.name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectReport(bucketId)
        console.log(userId)
        const contributedItems = getNumberOfOutputByUserId(
          response.data.projectReport.totalOutput,
          userId
        )
        setReportStatus((prevStats) => ({
          ...prevStats,
          totalOutput: contributedItems
        }))
      } catch (e) {
        console.error('Fetch error', e)
      }
    }

    fetchData()
  }, [])

  const url =
    environment === 'production'
      ? `ws://${project?.host.replace('\n', '')}:${project?.port}`
      : `ws://192.168.1.18:${project?.port}`

  let processor: any = null
  let connectTimeout: any

  const restart = () => {
    if (!restarting) {
      console.log('restart now ...')
      setRestarting(true)
      if (processor) {
        processor.close()
        setStatus(Status.DISCONNECTED)
        pause()
      }
      processor = null
    }
  }

  const start = () => {
    processor = null
    setTimeout(() => {
      console.log('connecting over WebSocket')

      processor = window.volunteer['websocket'](
        `${url}/volunteer`,
        window.bundle
      )
      console.log(processor)

      processor.on('status', (summary: any) => {
        console.log(summary)
      })

      processor.on('close', () => {
        pause()
        setStatus(Status.DISCONNECTED)
        console.log('closed')
      })

      processor.on('error', (err: any) => {
        restart()
        setStatus(Status.ERROR)
        console.log(err)
      })

      processor.on('ready', () => {
        setStatus(Status.RUNNING)
        reset()
        startStopWatch()
        clearTimeout(connectTimeout)
      })

      processor.on('log', (value: any) => {
        setLogs((current) => [value, ...current])
      })

      processor.on('deltaTime', (value: number) => {
        report(value)
      })

      console.log('setting restart timeout')
      connectTimeout = setTimeout(() => {
        console.log('connection timeout')
      }, 30 * 1000)
    }, Math.floor(Math.random() * 1000))

    const monitoringSocket = new WebSocket(`${url}/volunteer-monitoring`)
    socketRef.current = monitoringSocket

    monitoringSocket.onopen = () => {
      console.log('Connected to report status at ' + url)
    }
    monitoringSocket.onclose = () => {
      monitoringSocket.close()
      console.log('Connection closed at ' + url)
    }
    monitoringSocket.onerror = () => {
      monitoringSocket.close()
      console.log('Connection closed at ' + url)
    }

    return () => {
      monitoringSocket.close()
    }
  }

  const submit = (info: ReportStatus) => {
    const { dataTransferLoads, throughputs, cpuUsages, ...sendData } = info
    const reportData = {
      userId: userId,
      userName: userName,
      ...sendData
    }
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(reportData))
    } else {
      console.log('WebSocket connection is not open.')
    }
  }

  useEffect(() => {
    setReportStatus((prev) => ({
      ...prev,
      nbItems: 0,
      cpuTime: 0,
      dataTransferTime: 0
    }))
  }, [submitState])

  const [intervalId, setIntervalId] = useState<null | NodeJS.Timeout>(null)

  useEffect(() => {
    // Clean up the interval when the component unmounts
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  const report = (deltaTime: number) => {
    setReportStatus((prevStatus) => ({
      ...prevStatus,
      totalOutput: prevStatus.totalOutput + 1,
      nbItems: prevStatus.nbItems + 1,
      cpuTime: prevStatus.cpuTime + deltaTime
    }))
  }

  const handleClick = async () => {
    if (numOfScriptLoaded === MAX_SCRIPTS) {
      if (status !== Status.RUNNING) {
        start()
        // Start the interval when the button is clicked
        if (intervalId === null) {
          const newIntervalId = setInterval(() => {
            setReportStatus((prevStatus) => {
              const updatedStatus = { ...prevStatus }
              calculate(updatedStatus, setReportStatus)
              submit(updatedStatus)
              return updatedStatus
            })
            setSubmitState((prevState) => !prevState)
          }, 3002)
          setIntervalId(newIntervalId)
        }
      } else if (processor) {
        processor.terminate()
        setStatus(Status.DISCONNECTED)
        pause()
        processor = null
      }
    }
  }

  const handleScriptLoad = () => {
    setNumOfScriptLoaded((prev) => prev + 1)
  }

  useEffect(() => {
    if (numOfScriptLoaded === MAX_SCRIPTS) {
      setStatus(Status.READY)
    }
  }, [numOfScriptLoaded])

  const starting = status === Status.RUNNING
  const timer = formatStopWatch({ seconds, minutes, hours })

  useEffect(() => {
    const { throughput, throughputs } = reportStatus
    console.log(throughput, throughputs)
  }, [reportStatus])

  return (
    <>
      <Script
        src={`/static/volunteer.js?timestamp=${new Date().getTime()}`}
        onLoad={handleScriptLoad}
      />
      <Script src={bundleFile} onLoad={handleScriptLoad} />
      <Container my="60px" px={4} mt={{ base: 8 }}>
        <Flex flexWrap="wrap" gap="36px" w="full">
          <Flex
            w="min(100%, 500px)"
            flexDir="column"
            gap="32px"
            p="32px"
            border="1px solid"
            borderRadius="16px"
            borderColor="gray.200"
          >
            <Heading size="lg">{project.name}</Heading>
            <Text fontSize="md" lineHeight={6} color="gray.500">
              {project.description}
            </Text>
            <Author name={project.author.name} avatarSrc="" />
          </Flex>
          <VStack spacing="24px" w="min(100%, 500px)" pl={'10px'}>
            <Flex justify="space-between" w="full">
              <DataWithLabel
                label="Status"
                value={status}
                valueProps={{ color: statusColor[status] }}
                leftAdornment={
                  <DotIcon
                    w="12px"
                    h="12px"
                    color={statusColor[status]}
                    animation={
                      status === Status.RUNNING
                        ? `${animations.flash} 1s infinite linear reverse`
                        : ''
                    }
                  />
                }
              />
              <DataWithLabel label="Platform" value="100" />
              <DataWithLabel
                label="Duration"
                value={timer}
                rightAdornment={
                  starting ? (
                    <LoadingIcon
                      color="gray.500"
                      animation={
                        starting
                          ? `${animations.rotation} 4s infinite linear`
                          : ''
                      }
                    />
                  ) : undefined
                }
              />
            </Flex>
            <DataWithLabel
              label="Url"
              value="http://localhost:3000/projects/6479766078ef1e038b8a0097"
            />
            <Flex justify="space-between" w="full">
              <DataWithLabel label="OPS" value={reportStatus.throughput} />
              <DataWithLabel label="CPU Usage" value={reportStatus.cpuUsage} />
              <DataWithLabel
                label="My output"
                value={reportStatus.totalOutput}
              />
            </Flex>
          </VStack>
          {project?.host && (
            <Button
              onClick={handleClick}
              w="full"
              flex="1"
              minW="150px"
              colorScheme={starting ? 'red' : 'blue'}
            >
              {starting ? 'Terminate' : 'Start'}
            </Button>
          )}
        </Flex>
        <VStack
          spacing="24px"
          w="full"
          mt="60px"
          align={{ base: 'center', md: 'start' }}
        >
          <Heading size="md">Computing Logs</Heading>
          <Logs data={logs} tableContainerProps={{ maxH: '500px' }} />
        </VStack>
      </Container>
    </>
  )
}

export default RunProject

export const getServerSideProps: GetServerSideProps<{
  bundleFile: string | undefined
  environment: 'production' | 'development'
  project: {
    description: string
    name: string
    port: string
    host: string
    bucketId: string
    author: any
  }
}> = async (context) => {
  const { projectId = '' } = context.params || {}
  const { data } = await getProjectById(projectId.toString())
  const bundleFile = data
    ? await getPresignedUrl(`${data.bucketId}/source.js`)
    : ''
  return {
    props: {
      bundleFile,
      project: data,
      environment:
        process.env.NODE_ENV === 'production' ? 'production' : 'development'
    }
  }
}
