import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { FaHamburger } from "react-icons/fa"
import { MdHowToVote } from "react-icons/md"
import { BsStars } from "react-icons/bs"
import { HiNewspaper } from "react-icons/hi"
import { HiServerStack } from "react-icons/hi2"
import { DrawerItem } from "pages/home/components/DrawerItem"
import { SteakIcon } from "components/Assets/SteakIcon"
import { GameIcon } from "components/Assets/GameIcon"
import { motion } from "framer-motion"

export const MotionFlex = motion(Flex)

const MenuToggle = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("orange.200", "gray.900")
  const hoverBgColor = useColorModeValue("orange.300", "gray.700")
  const focusBgColor = useColorModeValue("orange.400", "gray.800")

  const drawerBgColor = useColorModeValue("orange.300", "#332D2D")
  const tooltipBgColor = useColorModeValue("white", "#262121")
  const tooltipBorderColor = useColorModeValue(
    "var(--chakra-colors-orange-400)",
    "#332D2D"
  )

  const textColor = useColorModeValue("#212121", "white")

  const handleClick = () => {
    onOpen()
  }

  const mockup = [
    {
      isDisabled: false,
      description: "What's apeing?",
      title: "News",
      icon: <HiNewspaper size="2rem" />
    },
    {
      isDisabled: true,
      description: "Manage your $JAPE",
      title: "Steak",
      icon: <SteakIcon w="2.5rem" h="2.5rem" />,
      popoverText:
        "Stake your $JAPES NFTs to receive $JAPE tokens. Stake $JAPE tokens for access to governance, pre-order merch and earn special rewards!"
    },
    {
      isDisabled: true,
      description: "Voice your opinion",
      title: "Govern",
      icon: <MdHowToVote size="2rem" />,
      popoverText:
        "Vote on Junø Apes DAO proposals. Form the future of this club together."
    },
    {
      isDisabled: true,
      description: "Watch $JAPES Collections",
      title: "Watch",
      icon: <BsStars size="2rem" />,
      popoverText:
        "A gallery for your and everyone elses Junø Apes. Coming Soon."
    },
    {
      isDisabled: true,
      description: "Play our Game",
      title: "Game",
      icon: <GameIcon w="2.5rem" h="2.5rem" />,
      popoverText:
        "A Junø Apes game using your NFTs will launch on the CoolCat network!"
    }
  ]

  return (
    <>
      <IconButton
        aria-label="theme toggle"
        variant="ghost"
        _active={{ bg: focusBgColor }}
        rounded="0.9em"
        bg={bgColor}
        _hover={{ bg: hoverBgColor }}
        icon={<FaHamburger />}
        onClick={() => handleClick()}
      />
      <Drawer onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay bg="transparent" backdropFilter="blur(70px)" />
        <DrawerContent roundedStart="3rem" bg={drawerBgColor}>
          <DrawerCloseButton />
          <DrawerHeader
            color="#f0827d"
            textAlign="center"
            textShadow="heading"
            fontFamily="heading"
            fontSize="2.25em"
            fontWeight="extrabold"
            transition="0.5s ease-out"
          >
            Junø Apes
          </DrawerHeader>
          <DrawerBody
            color={textColor}
            flex={1}
            display="flex"
            flexDirection="column"
            pb={4}
          >
            <MotionFlex
              direction="column"
              gap={5}
              as={motion.ul}
              transition={{ delayChildren: 0.3, staggerChildren: 0.3 }}
            >
              {mockup.map((listItem) => {
                return (
                  <DrawerItem
                    key={listItem.title}
                    title={listItem.title}
                    sub={listItem.description}
                    icon={listItem.icon}
                    isDisabled={listItem.isDisabled}
                    popoverText={listItem.popoverText}
                  />
                )
              })}
            </MotionFlex>
            <Spacer />
            <Flex direction="column" gap={3}>
              <Popover
                placement="left-start"
                trigger="hover"
                arrowShadowColor="none"
                arrowSize={10}
              >
                <PopoverTrigger>
                  <Flex w="full">
                    <DrawerItem
                      title="Validator"
                      sub="Check on our nodes"
                      icon={<HiServerStack size="2rem" />}
                      isDisabled
                    />
                  </Flex>
                </PopoverTrigger>
                <PopoverContent
                  rounded="1em"
                  border="none"
                  borderBottom={`6px solid ${tooltipBorderColor}`}
                  bg={tooltipBgColor}
                >
                  <PopoverCloseButton />
                  <PopoverHeader
                    fontFamily="heading"
                    fontSize="1.2em"
                    border="none"
                  >
                    Validator
                  </PopoverHeader>
                  <PopoverBody>
                    The Junø Apes validator will be spun up in Q1 2023.
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MenuToggle
