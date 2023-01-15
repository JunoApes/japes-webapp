import {
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  type ButtonProps,
  Circle,
  keyframes,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue
} from "@chakra-ui/react"
import { motion } from "framer-motion"

// rgba(0,255,100,0.5)
const pulse = keyframes`
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255,0,100,0.5);
  }

  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 4px rgba(255,0,100,0.2);
  }

  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(0,255,100,0.2;
  }
`

export const DrawerItem = ({
  title,
  sub,
  icon,
  isDisabled,
  popoverText
}: {
  title: string
  sub: string
  icon: any
  isDisabled: boolean
  popoverText?: string
} & ButtonProps) => {
  const tooltipBgColor = useColorModeValue("white", "#262121")
  const tooltipBorderColor = useColorModeValue(
    "var(--chakra-colors-orange-400)",
    "#332D2D"
  )

  return (
    <Popover
      placement="left-start"
      trigger="hover"
      arrowShadowColor="none"
      arrowSize={10}
    >
      <PopoverTrigger>
        <Flex w="full" as={motion.li} initial={{ x: -50 }} animate={{ x: 0 }}>
          <Button
            rounded="1rem"
            justifyContent="start"
            px="0.5rem"
            py="2rem"
            as={Flex}
            gap={2}
            w="full"
            bg={useColorModeValue("#ebebeb", "green.700")}
            _hover={{ bg: useColorModeValue("white", "green.600") }}
            alignItems="center"
            cursor="pointer"
            pos="relative"
            isDisabled={isDisabled}
          >
            {icon}
            <VStack align="start" justify="start" spacing={0}>
              <Heading lineHeight={1} fontSize="2xl">
                {title}
              </Heading>
              <Text fontSize="md">{sub}</Text>
            </VStack>
            {title === "Validator" && (
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
                top={-2}
                right={-2}
                size="1.5rem"
              />
            )}
          </Button>
        </Flex>
      </PopoverTrigger>
      {title !== "News" && (
        <PopoverContent
          rounded="1em"
          border="none"
          borderBottom={`6px solid ${tooltipBorderColor}`}
          bg={tooltipBgColor}
        >
          <PopoverArrow bg={tooltipBgColor} />
          <PopoverCloseButton />
          <PopoverHeader fontFamily="heading" fontSize="1.2em" border="none">
            {title}
          </PopoverHeader>
          <PopoverBody>{popoverText}</PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  )
}
