import {
  Box,
  Circle,
  Icon,
  IconButton,
  Link,
  Tooltip,
  useColorModeValue
} from "@chakra-ui/react"
import { pulse } from "pages/home/components/DrawerItem"
import { ReactElement } from "react"

const SocialMediaButton = ({
  icon,
  socialLink,
  tooltip,
  socialName
}: {
  icon: ReactElement
  socialLink: string
  tooltip: string
  socialName: string
}) => {
  const tooltipBgColor = useColorModeValue("white", "#262121")
  const tooltipColor = useColorModeValue("gray.800", "white")

  return (
    <Tooltip
      label={tooltip}
      rounded="0.9em"
      py={1.5}
      px={2}
      bg={tooltipBgColor}
      color={tooltipColor}
      shadow="none"
    >
      <Box pos="relative">
        <IconButton
          aria-label="theme toggle"
          as={Link}
          variant="ghost"
          size="sm"
          px={0}
          target="_blank"
          py={0}
          rounded="0.9em"
          fontSize="1em"
          bg={"transparent"}
          _hover={{
            bg: useColorModeValue("whiteAlpha.700", "whiteAlpha.200"),
            textDecor: "none"
          }}
          _active={{ bg: useColorModeValue("whiteAlpha.900", "red") }}
          icon={icon}
          href={socialLink}
        />
        {socialName === "telegram" && (
          <Circle
            _after={{
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "full",
              bg: "inherit",
              animation: `${pulse} infinite 2s linear`
            }}
            bg="rgb(255,0,100)"
            pos="absolute"
            top={0}
            right={0}
            size="0.5rem"
          />
        )}
      </Box>
    </Tooltip>
  )
}

export default SocialMediaButton
