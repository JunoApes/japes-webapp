import {
  Box,
  Button,
  Center,
  Circle,
  Icon,
  Image,
  Text,
  useClipboard,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { FiCopy } from "react-icons/fi"

import { handleChangeColorModeValue } from "./DefaultComponent"
import { CopyAddressType } from "./types"

const SIZES = {
  lg: {
    height: 12,
    walletImageSize: 7,
    icon: 5,
    fontSize: "lg"
  },
  md: {
    height: 10,
    walletImageSize: 6,
    icon: 4,
    fontSize: "sm"
  },
  sm: {
    height: 7,
    walletImageSize: 5,
    icon: 3.5,
    fontSize: "sm"
  }
}

export function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = "…" // character to insert into the center of the result

  if (str.length <= maxLength) return str

  // length of beginning part
  const left = Math.ceil(maxLength / 2)

  // start index of ending part
  const right = str.length - Math.floor(maxLength / 2) + 1

  return str.substring(0, left) + midChar + str.substring(right)
}

export const CopyAddressButton = ({
  address,
  walletIcon,
  isLoading,
  isRound,
  size = "md",
  maxDisplayLength
}: CopyAddressType) => {
  const { hasCopied, onCopy } = useClipboard(address ? address : "")
  const [displayAddress, setDisplayAddress] = useState("")
  const { colorMode } = useColorMode()
  const defaultMaxLength = {
    lg: 14,
    md: 16,
    sm: 18
  }

  useEffect(() => {
    if (!address) setDisplayAddress("address not identified yet")
    if (address && maxDisplayLength)
      setDisplayAddress(stringTruncateFromCenter(address, maxDisplayLength))
    if (address && !maxDisplayLength)
      setDisplayAddress(
        stringTruncateFromCenter(
          address,
          defaultMaxLength[size as keyof typeof defaultMaxLength]
        )
      )
  }, [address])

  return (
    <Button
      title={address}
      variant="unstyled"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={"1em"}
      w="full"
      h={SIZES[size as keyof typeof SIZES].height}
      minH="fit-content"
      px={3}
      py={3}
      gap={2}
      color={handleChangeColorModeValue(colorMode, "gray.700", "white")}
      transition="all .3s ease-in-out"
      isDisabled={!address && true}
      isLoading={isLoading}
      _focus={{
        outline: "none"
      }}
      _disabled={{
        opacity: 0.6,
        cursor: "not-allowed",
        _hover: {
          bg: "transparent"
        },
        _active: {
          outline: "none"
        },
        _focus: {
          outline: "none"
        }
      }}
      onClick={onCopy}
    >
      <Text fontWeight="200" fontSize="1em" opacity={1} color="white">
        {displayAddress}
      </Text>
      {address && (
        <Center
          as={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          rounded="full"
          bg="white"
          boxSize="1.5rem"
        >
          <Icon
            as={hasCopied ? FaCheckCircle : FiCopy}
            w={SIZES[size as keyof typeof SIZES].icon}
            h={SIZES[size as keyof typeof SIZES].icon}
            opacity={0.9}
            color={
              hasCopied
                ? "green.400"
                : handleChangeColorModeValue(colorMode, "gray.500", "black")
            }
          />
        </Center>
      )}
    </Button>
  )
}
