import { MenuIcon, SeacrhIcon } from "@/assets"
import { Flex } from "@chakra-ui/react"


const Header = () => {
  return (
    <Flex justifyContent={'space-between'} className="py-7 sticky top-0 bg-white shadow z-50 px-5 ">
      <MenuIcon />
      <SeacrhIcon />
    </Flex>
  )
}

export default Header