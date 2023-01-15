import { Flex, useColorMode, useColorModeValue } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

import Header from "./Header"
import Meta from "../Meta"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const layoutBgColor = useColorModeValue("orange.100", "black")
  const { colorMode } = useColorMode()
  console.log(colorMode)

  return (
    <Flex
      minH="100vh"
      w="full"
      transition="0.5s ease-out"
      overflow="hidden"
      bg={layoutBgColor}
    >
      <Meta />
      <Flex
        direction="column"
        w="full"
        align="start"
        justify="start"
        px={8}
        py={8}
      >
        <Header />
        <Flex w="full" justify="center" flex={1} as="main">
          {children}
        </Flex>
      </Flex>

      <ToastContainer
        key={"toastContainer"}
        closeButton={false}
        autoClose={3000}
        draggableDirection={"x"}
        newestOnTop={false}
        pauseOnHover
        toastStyle={{
          borderRadius: "0.9em",
          background: useColorModeValue("white", "#332D2D")
        }}
        progressStyle={{
          background: useColorModeValue(
            "var(--chakra-colors-orange-400)",
            "var(--chakra-colors-green-400)"
          ),
          height: "0.6rem"
        }}
        bodyStyle={{
          fontFamily: "var(--chakra-fonts-heading)",
          fontSize: "1.25em",
          color: useColorModeValue("var(--chakra-colors-gray-800)", "white")
        }}
        position="bottom-right"
        closeOnClick
        draggablePercent={20}
      />
    </Flex>
  )
}

export default Layout
