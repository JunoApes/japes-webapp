import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { BsFillMoonStarsFill } from "react-icons/bs"
import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri"

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bgColor = useColorModeValue("orange.200", "#332D2D")
  const hoverBgColor = useColorModeValue("orange.300", "#484040")
  const activeBgColor = useColorModeValue("orange.400", "#2d2828")

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      rounded="0.9em"
      bg={bgColor}
      _hover={{ bg: hoverBgColor }}
      _active={{ bg: activeBgColor }}
      icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <RiSunFill />}
      onClick={() => {
        toggleColorMode()
      }}
    />
  )
}

export default ThemeToggle
