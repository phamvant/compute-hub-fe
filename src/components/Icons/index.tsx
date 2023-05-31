import { createIcon } from '@chakra-ui/icons'

export const BoxIcon = createIcon({
  displayName: 'BoxIcon',
  viewBox: '0 0 32 32',
  path: (
    <path
      d="M26.6666 10L15.9999 4L5.33325 10M26.6666 10V22L15.9999 28M26.6666 10L15.9999 16M15.9999 28L5.33325 22V10M15.9999 28V16M5.33325 10L15.9999 16"
      stroke="currentColor"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  )
})

export const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  viewBox: '0 0 16 16',
  path: (
    <path
      d="M8.00004 3.33334V12.6667M3.33337 8.00001H12.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  )
})

export const CloudUploadIcon = createIcon({
  displayName: 'CloudUploadIcon',
  viewBox: '0 0 25 24',
  path: [
    <path
      fillRule="evenodd"
      key="cloud-upload"
      clipRule="evenodd"
      d="M7.109 2.013C8.60822 0.720203 10.5204 0.00620777 12.5 0C16.535 0 19.8845 3 20.249 6.8685C22.637 7.206 24.5 9.2055 24.5 11.6595C24.5 14.3535 22.253 16.5 19.5305 16.5H15.5C15.3011 16.5 15.1103 16.421 14.9697 16.2803C14.829 16.1397 14.75 15.9489 14.75 15.75C14.75 15.5511 14.829 15.3603 14.9697 15.2197C15.1103 15.079 15.3011 15 15.5 15H19.532C21.4685 15 23 13.482 23 11.6595C23 9.8355 21.47 8.3175 19.5305 8.3175H18.7805V7.5675C18.782 4.2375 15.992 1.5 12.5 1.5C10.8798 1.50647 9.31526 2.09165 8.0885 3.15C6.953 4.128 6.359 5.307 6.359 6.2325V6.9045L5.6915 6.978C3.596 7.2075 2 8.928 2 10.977C2 13.1775 3.845 15 6.1715 15H9.5C9.69891 15 9.88968 15.079 10.0303 15.2197C10.171 15.3603 10.25 15.5511 10.25 15.75C10.25 15.9489 10.171 16.1397 10.0303 16.2803C9.88968 16.421 9.69891 16.5 9.5 16.5H6.1715C3.062 16.5 0.5 14.049 0.5 10.977C0.5 8.3325 2.399 6.1425 4.913 5.5875C5.1275 4.293 5.96 3.003 7.109 2.013Z"
      fill="currentColor"
    />,

    <path
      fillRule="evenodd"
      key="arrow-up"
      clipRule="evenodd"
      d="M11.969 6.219C12.0386 6.14915 12.1214 6.09374 12.2125 6.05593C12.3036 6.01812 12.4013 5.99866 12.5 5.99866C12.5986 5.99866 12.6963 6.01812 12.7874 6.05593C12.8785 6.09374 12.9613 6.14915 13.031 6.219L17.531 10.719C17.6718 10.8598 17.7509 11.0508 17.7509 11.25C17.7509 11.4492 17.6718 11.6402 17.531 11.781C17.3901 11.9218 17.1991 12.0009 17 12.0009C16.8008 12.0009 16.6098 11.9218 16.469 11.781L13.25 8.5605V21.75C13.25 21.9489 13.171 22.1397 13.0303 22.2803C12.8896 22.421 12.6989 22.5 12.5 22.5C12.3011 22.5 12.1103 22.421 11.9696 22.2803C11.829 22.1397 11.75 21.9489 11.75 21.75V8.5605L8.53097 11.781C8.39014 11.9218 8.19913 12.0009 7.99997 12.0009C7.80081 12.0009 7.6098 11.9218 7.46897 11.781C7.32814 11.6402 7.24902 11.4492 7.24902 11.25C7.24902 11.0508 7.32814 10.8598 7.46897 10.719L11.969 6.219Z"
      fill="currentColor"
    />
  ]
})

export const UnprocessedUnitIcon = createIcon({
  displayName: 'UnprocessedUnitIcon',
  viewBox: '0 0 18 18',
  path: (
    <path
      d="M6.42 2.7675C5.60106 3.10649 4.8569 3.60345 4.23 4.23M2.7675 6.42C2.42742 7.23772 2.25158 8.11438 2.25 9M2.7675 11.58C3.10649 12.3989 3.60345 13.1431 4.23 13.77M6.42 15.2325C7.23772 15.5726 8.11438 15.7484 9 15.75M11.58 15.2325C12.3989 14.8935 13.1431 14.3966 13.77 13.77M15.2325 11.58C15.5726 10.7623 15.7484 9.88562 15.75 9M15.2325 6.42C14.8935 5.60106 14.3966 4.8569 13.77 4.23M11.58 2.7675C10.7623 2.42742 9.88562 2.25158 9 2.25"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
})

export const GroupPeopleIcon = createIcon({
  displayName: 'GroupPeopleIcon',
  viewBox: '0 0 18 18',
  path: (
    <path
      d="M6 15.75V15C6 14.6022 6.15804 14.2206 6.43934 13.9393C6.72064 13.658 7.10218 13.5 7.5 13.5H10.5C10.8978 13.5 11.2794 13.658 11.5607 13.9393C11.842 14.2206 12 14.6022 12 15V15.75M12.75 7.5H14.25C14.6478 7.5 15.0294 7.65804 15.3107 7.93934C15.592 8.22064 15.75 8.60218 15.75 9V9.75M2.25 9.75V9C2.25 8.60218 2.40804 8.22064 2.68934 7.93934C2.97064 7.65804 3.35218 7.5 3.75 7.5H5.25M7.5 9.75C7.5 10.1478 7.65804 10.5294 7.93934 10.8107C8.22064 11.092 8.60218 11.25 9 11.25C9.39782 11.25 9.77936 11.092 10.0607 10.8107C10.342 10.5294 10.5 10.1478 10.5 9.75C10.5 9.35218 10.342 8.97064 10.0607 8.68934C9.77936 8.40804 9.39782 8.25 9 8.25C8.60218 8.25 8.22064 8.40804 7.93934 8.68934C7.65804 8.97064 7.5 9.35218 7.5 9.75ZM11.25 3.75C11.25 4.14782 11.408 4.52936 11.6893 4.81066C11.9706 5.09196 12.3522 5.25 12.75 5.25C13.1478 5.25 13.5294 5.09196 13.8107 4.81066C14.092 4.52936 14.25 4.14782 14.25 3.75C14.25 3.35218 14.092 2.97064 13.8107 2.68934C13.5294 2.40804 13.1478 2.25 12.75 2.25C12.3522 2.25 11.9706 2.40804 11.6893 2.68934C11.408 2.97064 11.25 3.35218 11.25 3.75ZM3.75 3.75C3.75 4.14782 3.90804 4.52936 4.18934 4.81066C4.47064 5.09196 4.85218 5.25 5.25 5.25C5.64782 5.25 6.02936 5.09196 6.31066 4.81066C6.59196 4.52936 6.75 4.14782 6.75 3.75C6.75 3.35218 6.59196 2.97064 6.31066 2.68934C6.02936 2.40804 5.64782 2.25 5.25 2.25C4.85218 2.25 4.47064 2.40804 4.18934 2.68934C3.90804 2.97064 3.75 3.35218 3.75 3.75Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
})

export const UploadFileIcon = createIcon({
  displayName: 'UploadFileIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill="currentColor"
      d="m19.41 7.41l-4.83-4.83c-.37-.37-.88-.58-1.41-.58H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.42zM14.8 15H13v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H9.21c-.45 0-.67-.54-.35-.85l2.8-2.79c.2-.19.51-.19.71 0l2.79 2.79c.3.31.08.85-.36.85zM14 9c-.55 0-1-.45-1-1V3.5L18.5 9H14z"
    ></path>
  )
})
