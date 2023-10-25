import { Box, Center, Container } from "@chakra-ui/react"

const Menu = () => {
  return (
    <Container
      className="fixed bottom-3"
    >
      <Center>
        <Box
          bgColor={'#091227'}
          className="text-white w-full min-h-[50px] rounded-lg p-3">

        </Box>
      </Center>
    </Container>
  )
}

export default Menu