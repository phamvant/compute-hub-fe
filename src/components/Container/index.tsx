import { Flex, FlexProps } from '@chakra-ui/react'

const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      m="auto"
      alignItems="center"
      justifyContent="flex-start"
      maxW="container.xl"
      {...props}
    />
  )
}

export default Container
