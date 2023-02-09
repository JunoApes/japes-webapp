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

import { ParameterChangeProposal } from "@coolcatchain/chain/types/codegen/cosmos/params/v1beta1/params"

export const MotionFlex = motion(Flex)

const MenuToggle = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("orange.200", "#332D2D")
  const hoverBgColor = useColorModeValue("orange.300", "#484040")
  const activeBgColor = useColorModeValue("orange.400", "#2d2828")

  const drawerBgColor = useColorModeValue("orange.300", "#332D2D")
  const tooltipBgColor = useColorModeValue("white", "#262121")
  const tooltipBorderColor = useColorModeValue(
    "var(--chakra-colors-orange-400)",
    "#332D2D"
  )

  const textColor = useColorModeValue("gray.800", "white")

  const handleClick = () => {
    onOpen()
  }

  const mockup = [
    {
      isDisabled: false,
      description: "What's apeing?",
      title: "News",
      icon: <HiNewspaper size="2rem" />,
      link: "/"
    },
    {
      isDisabled: false,
      description: "Manage your $JAPE",
      title: "Steak",
      icon: <SteakIcon w="2.5rem" h="2.5rem" />,
      popoverText:
        "Stake your $JAPES NFTs to receive voting power in the Junø Apes DAO, pre-order merch (soon) and earn additional EXTERNAL rewards!",
      link: "https://daodao.zone/dao/juno14zcdg8w3pyp7nfzaye7jp0tzynk8xpstqax5g9ypj2u66n4lst2strvwjs"
    },
    {
      isDisabled: false,
      description: "Voice your opinion",
      title: "Govern",
      icon: <MdHowToVote size="2rem" />,
      popoverText:
        "Vote on Junø Apes DAO proposals. Form the future of this club together.",
      link: "https://daodao.zone/dao/juno14zcdg8w3pyp7nfzaye7jp0tzynk8xpstqax5g9ypj2u66n4lst2strvwjs#proposals"
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
        _active={{ bg: activeBgColor }}
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
            <MotionFlex direction="column" gap={5} as={motion.ul}>
              {mockup.map((listItem, index) => {
                return (
                  <DrawerItem
                    key={listItem.title}
                    title={listItem.title}
                    sub={listItem.description}
                    icon={listItem.icon}
                    isDisabled={listItem.isDisabled}
                    popoverText={listItem.popoverText}
                    index={index}
                    link={listItem.link}
                  />
                )
              })}
            </MotionFlex>
            <Spacer />
            <Flex direction="column" gap={3} w="full">
              <Popover
                placement="left-start"
                trigger="hover"
                arrowShadowColor="none"
                arrowSize={10}
              >
                <PopoverTrigger>
                  <MotionFlex
                    as={motion.li}
                    w="full"
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, bounce: 0.4 }}
                  >
                    <DrawerItem
                      title="Validator"
                      sub="Check on our nodes"
                      icon={<HiServerStack size="2rem" />}
                      isDisabled
                      index={0}
                      link={""}
                    />
                  </MotionFlex>
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
                    Commissions will be used to buy-back $JAPE on a regular
                    base.
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
