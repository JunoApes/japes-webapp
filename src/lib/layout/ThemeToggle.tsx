import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiMoonFill, RiSunFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("orange.200", "gray.900");
  const hoverBgColor = useColorModeValue("orange.300", "gray.700");
  const focusBgColor = useColorModeValue("orange.500", "gray.800");

  return (
    <IconButton
      aria-label="theme toggle"
      variant="ghost"
      rounded="0.9em"
      bg={bgColor}
      _hover={{ bg: hoverBgColor }}
      _focus={{ bg: focusBgColor }}
      icon={colorMode === "light" ? <BsFillMoonStarsFill /> : <RiSunFill />}
      onClick={() => {
        toggleColorMode();
      }}
    />
  );
};

export default ThemeToggle;
