import { Spinner } from "@chakra-ui/react"

const LoadingPage = () => {
  return (
    <div className="grid place-items-center h-screen"><Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    /></div>
  )
}

export default LoadingPage