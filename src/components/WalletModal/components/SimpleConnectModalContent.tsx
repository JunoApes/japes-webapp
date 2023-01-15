/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDimensions
} from "@chakra-ui/react"
import { useChain } from "@cosmos-kit/react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useRef, useState } from "react"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { QRCode } from "react-qrcode-logo"
import { SIZES, Variants } from "./ConnectWalletButton"

import { handleChangeColorModeValue } from "./DefaultComponent"
import {
  AnimateBox,
  AnimateGridItem,
  LoadingVariants,
  ModalContentVariants
} from "./Motion"
import {
  ConnectModalContentType,
  DisplayWalletListType,
  DownloadWalletButtonType
} from "./types"

export const SimpleInstallWalletButton = ({
  icon,
  text,
  onClick,
  disabled
}: DownloadWalletButtonType) => {
  const { colorMode } = useColorMode()
  return (
    <Button
      variant="unstyled"
      h="auto"
      as={motion.button}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      fontWeight="200"
      fontSize="md"
      color="white"
      bg={handleChangeColorModeValue(colorMode, "orange.300", "green.700")}
      rounded="0.9em"
      _hover={{
        bg: handleChangeColorModeValue(colorMode, "orange.400", "green.600")
      }}
      _active={{ opacity: 0.9 }}
      _focus={{ outline: "none" }}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: { opacity: 0.5 },
        _active: { opacity: 0.5 }
      }}
      isDisabled={disabled}
      onClick={onClick}
    >
      <Stack
        w="full"
        isInline={true}
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        {icon && <Icon as={icon} />}
        <Text whiteSpace="break-spaces">{text ? text : `Install Wallet`}</Text>
      </Stack>
    </Button>
  )
}

export const SimpleDisplayModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton
}: ConnectModalContentType) => {
  const { colorMode } = useColorMode()
  const { closeView } = useChain("juno")
  const Style = {
    warning: {
      color: handleChangeColorModeValue(colorMode, "orange.300", "orange.400")
    },
    error: {
      color: handleChangeColorModeValue(colorMode, "red.400", "red.500")
    },
    loading: {
      color: handleChangeColorModeValue(colorMode, "inherit", "inherit")
    }
  }

  const descRef = useRef(null)
  const [displayBlur, setDisplayBlur] = useState(false)

  useEffect(() => {
    if (descRef.current) {
      // @ts-ignore
      if (descRef.current.clientHeight >= 96) setDisplayBlur(true)
      const scrollHandler = () => {
        const height = Math.abs(
          // @ts-ignore
          descRef.current.scrollHeight -
            // @ts-ignore
            descRef.current.clientHeight -
            // @ts-ignore
            descRef.current.scrollTop
        )
        if (height < 1) setDisplayBlur(false)
        if (height >= 1) setDisplayBlur(true)
      }

      // @ts-ignore
      descRef.current.addEventListener("scroll", scrollHandler)
    }
  }, [descRef])

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ModalContentVariants}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={4}
        gap={3}
      >
        {logo && (
          <Center
            position="relative"
            mx="auto"
            w={20}
            h={20}
            minW={20}
            minH={20}
            maxW={20}
            maxH={20}
            mb={typeof logo === "string" ? 4 : 2}
          >
            {status === "loading" && (
              <AnimateBox
                position="absolute"
                top={-1.5}
                right={-1.5}
                bottom={-1.5}
                left={-1.5}
                border="5px solid"
                borderTopColor="transparent"
                borderBottomColor="transparent"
                borderLeftColor={useColorModeValue("orange.400", "green.600")}
                borderRightColor={useColorModeValue("orange.400", "green.600")}
                borderRadius="full"
                initial="hidden"
                animate="animate"
                variants={LoadingVariants}
              ></AnimateBox>
            )}
            {(status === "warning" || status === "error") && (
              <Box
                position="absolute"
                top={-2}
                right={-2}
                bottom={-2}
                left={-2}
                border="2px solid"
                borderColor={Style[status].color}
                borderRadius="full"
              ></Box>
            )}
            <Box borderRadius="full" p={typeof logo === "string" ? 3.5 : 0}>
              {typeof logo === "string" ? (
                <Image src={logo} w="full" h="full" />
              ) : (
                <Icon as={logo} w="full" h="full" />
              )}
            </Box>
          </Center>
        )}
        {contentHeader && (
          <Text
            fontSize="xl"
            fontWeight="200"
            fontFamily="heading"
            color={
              Style[status!]?.color ||
              handleChangeColorModeValue(colorMode, "gray.800", "white")
            }
            mb={1}
          >
            {contentHeader}
          </Text>
        )}
        {contentDesc && (
          <Box position="relative">
            <Box
              ref={descRef}
              w="full"
              h={"6rem"}
              overflowY="scroll"
              css={{
                // For Firefox
                scrollbarWidth: "none",
                // For Chrome and other browsers except Firefox
                "&::-webkit-scrollbar": {
                  display: "none"
                }
              }}
            >
              <Text
                textAlign="left"
                fontSize="md"
                lineHeight={1.2}
                whiteSpace="pre-line"
                maxW="40rem"
                px={8}
              >
                {contentDesc}
              </Text>
            </Box>
            <AnimateBox
              initial={false}
              animate={
                displayBlur
                  ? {
                      opacity: 1,
                      height: 36,
                      transition: {
                        type: "spring",
                        duration: 0.1
                      }
                    }
                  : {
                      height: 0,
                      opacity: 0,
                      transition: {
                        type: "spring",
                        duration: 0.2
                      }
                    }
              }
              position="absolute"
              bottom={0}
              bg={handleChangeColorModeValue(colorMode, "#fff", "gray.700")}
              style={{ marginTop: 0 }}
              w="full"
              background={handleChangeColorModeValue(
                colorMode,
                "linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)",
                "linear-gradient(0deg, rgba(51, 45, 45,1) 6%, rgba(51, 45, 45,0.95) 16%, rgba(51, 45, 45,0.85) 36%, rgba(51, 45, 45,0.75) 45%, rgba(51, 45, 45,0.65) 55%, rgba(51, 45, 45,0.4) 70%, rgba(51, 45, 45,0.2) 80%, rgba(51, 45, 45,0.1) 95%)"
              )}
            ></AnimateBox>
          </Box>
        )}
        {username && (
          <HStack
            bg={useColorModeValue("orange.300", "whiteAlpha.500")}
            px={3}
            py={1}
            gap={3}
            rounded="0.9em"
          >
            <Stack isInline={true} justifyContent="center" alignItems="center">
              <Center w={6} h={6} minW={4} minH={4} maxW={6} maxH={6}>
                <Image src={walletIcon} />
              </Center>
              <Text
                fontSize="2xl"
                fontWeight="300"
                fontFamily="heading"
                color={useColorModeValue("gray.800", "white")}
              >
                {username}
              </Text>
            </Stack>

            {addressButton && <Flex flex={1}>{addressButton}</Flex>}
          </HStack>
        )}

        {bottomButton && (
          <Flex w="full" gap={2} justify="center">
            {bottomButton}
            <IconButton
              as={motion.button}
              aria-label="Confirm Wallet Selection"
              rounded="0.9em"
              icon={<Icon as={BsFillCheckCircleFill}></Icon>}
              {...Variants(colorMode)[
                "primary" as keyof ReturnType<typeof Variants>
              ]}
              w={SIZES["lg" as keyof typeof SIZES].h}
              h={SIZES["lg" as keyof typeof SIZES].h}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              display="flex"
              alignItems="center"
              fontSize={SIZES["lg" as keyof typeof SIZES].fontSize}
              onClick={() => closeView()}
            />
          </Flex>
        )}
      </Flex>
    </AnimateBox>
  )
}

export const SimpleQRCode = ({
  link,
  description
}: {
  link: string
  description?: string
}) => {
  const elementRef = useRef(null)
  const dimensions = useDimensions(elementRef)
  const { colorMode } = useColorMode()
  return (
    <AnimateBox
      ref={elementRef}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ModalContentVariants}
    >
      <Stack justifyContent="center" alignItems="center" spacing={4} p={4}>
        {description && (
          <Text
            fontWeight="medium"
            textAlign="center"
            opacity={0.75}
            color={handleChangeColorModeValue(colorMode, "gray.800", "white")}
          >
            {description}
          </Text>
        )}
        <Center borderRadius="0.9em" overflow="hidden">
          <Flex
            maxW="sm"
            rounded="3xl"
            overflow="hidden"
            as={QRCode}
            value={link}
            logoImage={"/assets/logo_transparent.png"}
            eyeRadius={[
              [25, 25, 0, 25], // top/left eye
              [25, 25, 25, 0], // top/right eye
              [25, 0, 25, 25] // bottom/left
            ]}
            quietZone={20}
            qrStyle="dots"
            logoWidth={100}
            size={350}
            bgColor={"#ffffff"}
            fgColor={"#f0827d"}
            ecLevel={"L"}
          />
        </Center>
      </Stack>
    </AnimateBox>
  )
}

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData
}: DisplayWalletListType) => {
  const { colorMode } = useColorMode()
  const listRef = useRef(null)
  const [displayBlur, setDisplayBlur] = useState(false)

  useEffect(() => {
    const current = listRef.current as any
    if (listRef && current) {
      if ((current as any).clientHeight >= 311) setDisplayBlur(true)
      const scrollHandler = () => {
        const height = Math.abs(
          current?.scrollHeight - current?.clientHeight - current?.scrollTop
        )
        if (height < 1) setDisplayBlur(false)
        if (height >= 1) setDisplayBlur(true)
      }

      current.addEventListener("scroll", scrollHandler)
    }
  }, [listRef])

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      variants={ModalContentVariants}
    >
      <Grid
        ref={listRef}
        position="relative"
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        templateRows={{ base: "max-content", md: "auto" }}
        columnGap={2.5}
        rowGap={2}
        maxH={80}
        minH={36}
        overflowY="scroll"
        paddingInline={0}
        px={6}
        css={{
          // for firefox
          scrollbarWidth: "none",
          // for chrome
          "::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        {walletsData.map(({ name, prettyName, logo, onClick }, i) => {
          return (
            <GridItem
              key={i}
              colSpan={{ base: 2, md: i > 1 ? 2 : "auto" }}
              w="full"
            >
              <Button
                ref={i === 0 ? initialFocus : null}
                id={name}
                key={name}
                variant="unstyled"
                display="flex"
                w="full"
                h="fit-content"
                p={{ base: 2, md: i > 1 ? 2 : 3 }}
                py={{ md: i > 1 ? 2 : 7 }}
                mb={{ base: 0, md: i > 1 ? 0 : 1.5 }}
                justifyContent="start"
                borderRadius="0.9em"
                whiteSpace="break-spaces"
                color={handleChangeColorModeValue(
                  colorMode,
                  "blackAlpha.800",
                  "whiteAlpha.800"
                )}
                transition="all .15s ease-in-out"
                bg={handleChangeColorModeValue(
                  colorMode,
                  "orange.300",
                  "green.700"
                )}
                _hover={{
                  bg: handleChangeColorModeValue(
                    colorMode,
                    "orange.400",
                    "green.600"
                  )
                }}
                _focus={{
                  bg: handleChangeColorModeValue(
                    colorMode,
                    "orange.500",
                    "green.800"
                  )
                }}
                onClick={onClick}
              >
                <Flex
                  w="full"
                  flexDirection={{ base: "row", md: i > 1 ? "row" : "column" }}
                  justifyContent="start"
                  alignItems="center"
                >
                  <Box
                    borderRadius="0.8em"
                    overflow="hidden"
                    w={{ base: 8, md: i > 1 ? 8 : 14 }}
                    h={{ base: 8, md: i > 1 ? 8 : 14 }}
                    minW={{ base: 8, md: i > 1 ? 8 : 14 }}
                    minH={{ base: 8, md: i > 1 ? 8 : 14 }}
                    maxW={{ base: 8, md: i > 1 ? 8 : 14 }}
                    maxH={{ base: 8, md: i > 1 ? 8 : 14 }}
                    mr={{ base: 4, md: i > 1 ? 4 : 0 }}
                    mb={{ base: 0, md: i > 1 ? 0 : 3 }}
                  >
                    <Image src={typeof logo === "string" ? logo : void 0} />
                  </Box>
                  <Box textAlign="start" flex={1}>
                    <Text
                      color="white"
                      fontSize={i >= 2 ? "md" : "xl"}
                      fontWeight="200"
                      fontFamily="heading"
                      lineHeight={1.2}
                    >
                      {prettyName}
                    </Text>
                  </Box>
                </Flex>
              </Button>
            </GridItem>
          )
        })}
        <AnimateGridItem
          initial={false}
          animate={
            displayBlur
              ? {
                  opacity: 1,
                  height: 2,
                  transition: {
                    type: "spring",
                    duration: 0.1
                  }
                }
              : {
                  height: 0,
                  opacity: 0,
                  transition: {
                    type: "spring",
                    duration: 0.2
                  }
                }
          }
          position="sticky"
          bg={handleChangeColorModeValue(colorMode, "#fff", " #332D2D")}
          style={{ marginTop: 0, bg: "#332D2D" }}
          colSpan={2}
          w="full"
          boxShadow={handleChangeColorModeValue(
            colorMode,
            "0 -3px 2px 2px #fff, 0 -4px 6px 2px #fff, 0 -4px 4px 2px #fff, 0 -5px 10px 2px #fff, 0 -8px 4px #fff, 0 -8px 6px 1px #fff, 0 -8px 8px 1px #fff",
            "0 -3px 2px 2px #332D2D, 0 -4px 6px 2px #332D2D, 0 -4px 4px 2px #332D2D, 0 -5px 10px 2px #332D2D, 0 -8px 4px #332D2D, 0 -8px 6px 1px #332D2D, 0 -8px 8px 1px #332D2D"
          )}
        ></AnimateGridItem>
      </Grid>
    </AnimateBox>
  )
}
