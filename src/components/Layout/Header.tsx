import { Flex, Spacer } from "@chakra-ui/react"
import ConnectButton from "components/ConnectButton"

import MenuToggle from "../MenuToggle"
import ThemeToggle from "../ThemeToggle"

const Header = () => {
  return (
    <Flex as="header" w="full" align="center" justifyContent="flex-end" gap={2}>
      <ConnectButton />
      <Spacer />
      <ThemeToggle />
      <MenuToggle />
    </Flex>
  )
}

export default Header
