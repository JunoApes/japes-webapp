/* eslint-disable no-negated-condition */
import {
  type ButtonProps,
  Button,
  Text,
  Avatar,
  IconButton,
  useBreakpoint,
  useClipboard,
  VStack,
  HStack,
  useColorModeValue
} from "@chakra-ui/react"
import { WalletStatus } from "@cosmos-kit/core"
import { useChain, useManager } from "@cosmos-kit/react"
import {
  animate,
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  type Variants
} from "framer-motion"
import truncateAddress from "utils/truncateAddress"
import { type FC, useEffect } from "react"
import { FaClipboardList } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import { useLocalStorageState } from "ahooks"
import { toast } from "react-toastify"

export type ConnectButtonProps = ButtonProps & {
  activeIndex?: number
}

const connectWalletVariants: Variants = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween"
    },
    y: -30
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween"
    },
    y: 0
  }
}

export const walletToolbarVariants: Variants = {
  hide: {
    transition: {
      staggerChildren: 0.25,
      transition: {
        duration: 0.5,
        type: "tween"
      }
    }
  },
  show: {
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.2,
      transition: {
        duration: 1,
        type: "tween"
      }
    }
  }
}

export const walletToolbarItemVariants: Variants = {
  hide: { opacity: 0, y: -0 },
  show: { opacity: 1, y: 0 }
}

const ConnectButton: FC<ConnectButtonProps> = () => {
  const {
    address,
    openView,
    isWalletConnected,
    status: walletStatus
  } = useChain("juno")

  const { onCopy } = useClipboard(address!)

  const breakpoint = useBreakpoint()
  const connectWalletBackgroundSize = useMotionValue("100% 100%")

  const [connectedWalletStorage, setConnectedWalletStorage] =
    useLocalStorageState<boolean>("@japes-walletStatus", {
      defaultValue: false
    })

  const connectWalletBackgroundImage = useMotionValue(
    connectedWalletStorage
      ? "linear-gradient(0deg, rgb(17, 145, 98),rgb(17, 145, 98))"
      : "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))"
  )

  useEffect(() => {
    if (walletStatus === WalletStatus.Connected) {
      animate(
        connectWalletBackgroundImage,
        "linear-gradient(0deg, rgb(17, 145, 98),rgb(17, 145, 98))",
        {
          duration: 0.5,
          type: "tween"
        }
      )
      setConnectedWalletStorage(true)
    } else {
      animate(
        connectWalletBackgroundImage,
        "linear-gradient(0deg, rgb(218, 32, 73),rgb(218, 32, 73))",
        {
          duration: 0.5,
          type: "tween"
        }
      )
      setConnectedWalletStorage(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStatus])

  const textColor = useColorModeValue("white", "white")

  return (
    <Button
      _active={isWalletConnected ? {} : { filter: "brightness(120%)" }}
      _hover={
        isWalletConnected
          ? {}
          : { cursor: "pointer", filter: "brightness(110%)" }
      }
      alignItems="center"
      justifyItems="start"
      bgSize="100% 100%"
      color={textColor}
      as={motion.div}
      w={{ base: "5rem", md: "14rem" }}
      h="4rem"
      onClick={async () => {
        if (isWalletConnected) return
        openView()
      }}
      overflow="hidden"
      rounded="1.25em"
      px={2}
      gap={2}
      style={{
        // @ts-expect-error "MotionValue(string) != string"
        backgroundImage: connectWalletBackgroundImage
      }}
    >
      <Avatar
        bg="rgba(0,0,0,0.4)"
        backgroundBlendMode="soft-light"
        backdropFilter="blur(20px) saturate(140%)"
        size="md"
        src=""
        pos="relative"
      />
      {breakpoint !== "base" && breakpoint !== "sm" && (
        <HStack h="full" justify="start" w="full">
          <AnimatePresence mode="wait">
            {isWalletConnected ? (
              <VStack
                w="8rem"
                animate="show"
                as={motion.div}
                exit="hide"
                fontSize="md"
                initial="hide"
                justify="start"
                key="walletConnected"
                spacing={1}
                variants={connectWalletVariants}
              >
                <Text
                  textAlign="start"
                  w="full"
                  fontSize={{ lg: "md", md: "sm" }}
                >
                  {truncateAddress(address!, 5, 6)}
                </Text>
                <HStack
                  align="start"
                  justify="start"
                  animate="show"
                  as={motion.div}
                  exit="hide"
                  initial="hide"
                  spacing={1}
                  variants={walletToolbarVariants}
                  w="full"
                >
                  <IconButton
                    bg="rgba(255,255,255,0.4)"
                    _hover={{ background: "rgba(255,255,255,0.5)" }}
                    _active={{ background: "rgba(255,255,255,0.3)" }}
                    aria-label="Copy wallet address to clipboard"
                    as={motion.div}
                    icon={<FaClipboardList size="1rem" />}
                    onClick={(event) => {
                      event.stopPropagation()
                      onCopy()
                      toast("Copied address!")
                    }}
                    size="xs"
                    variants={walletToolbarItemVariants}
                  />
                  <IconButton
                    bg="rgba(255,255,255,0.4)"
                    _hover={{ background: "rgba(255,255,255,0.5)" }}
                    _active={{ background: "rgba(255,255,255,0.3)" }}
                    aria-label="Open Wallet Modal"
                    as={motion.div}
                    icon={<BiLogOut size="1rem" />}
                    onClick={async (event) => {
                      event.stopPropagation()
                      openView()
                    }}
                    size="xs"
                    variants={walletToolbarItemVariants}
                  />
                </HStack>
              </VStack>
            ) : (
              <Text
                w="full"
                fontSize="md"
                initial={false}
                key="walletDisconnected"
                animate="show"
                as={motion.div}
                exit="hide"
                variants={connectWalletVariants}
              >
                Connect Wallet
              </Text>
            )}
          </AnimatePresence>
        </HStack>
      )}
    </Button>
  )
}

export default ConnectButton
