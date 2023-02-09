import {
  chakra,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Image,
  Button,
  VStack,
  Link,
  Center
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { MotionFlex } from "components/MenuToggle"
import { useState } from "react"
import { Typewriter } from "react-simple-typewriter"

const SomeText = () => {
  const textColor = useColorModeValue("#212121", "white")

  const [isHovered, setIsHovered] = useState(false)

  return (
    <MotionFlex
      textAlign="center"
      gap={9}
      color="#f0827d"
      justifyContent="center"
      alignItems="center"
      direction="column"
      pos="relative"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      pt={{ base: 10, md: 18 }}
      pb={{ base: 0, md: 8 }}
      transition={{ staggerChildren: 1, delayChildren: 1 }}
    >
      <Image
        as={motion.img}
        initial={{ y: 200, opacity: 0 }}
        animate={{
          transition: { delay: 0.25, ease: "easeOut" },
          y: 0,
          opacity: 1
        }}
        src="/assets/jape_logo.png"
        pos="absolute"
        maxW="30rem"
        zIndex="0"
      />
      <VStack
        gap={0}
        as={motion.div}
        initial={{ y: 200, opacity: 0 }}
        animate={{
          transition: {
            delay: 6.5,
            type: "spring",
            bounce: 0.4,
            damping: 7
          },
          y: 0,
          opacity: 1
        }}
      >
        <Heading
          textShadow="heading"
          fontSize={{ base: "3em", md: "4.5em" }}
          fontWeight="extrabold"
          transition="0.5s ease-out"
          zIndex="1"
        >
          Junø Apes
        </Heading>
        <Heading
          textShadow="heading"
          fontSize={{ base: "1.5em", md: "2.2em" }}
          fontWeight="extrabold"
          transition="0.5s ease-out"
          zIndex="1"
          pos="relative"
        >
          App Coming Soon
          <chakra.span
            pos="absolute"
            textShadow="none"
            opacity={1}
            top={0.5}
            right={-7}
            rotate="25deg"
            transform="auto"
            fontSize={{ base: "0.6em", md: "0.4em" }}
          >
            (ish)
          </chakra.span>
        </Heading>
      </VStack>

      <Center
        as={motion.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          transition: {
            delay: 0,
            type: "tween",
            duration: 1
          },
          scale: 1,
          opacity: 1
        }}
        flex={1}
        zIndex="1"
        fontWeight="bold"
        color={textColor}
        fontSize="1.35em"
        letterSpacing={0.2}
        maxW={{ base: "xs", md: "lg" }}
        textAlign="left"
        transition="0.5s ease-out"
      >
        <Typewriter
          typeSpeed={20}
          cursorBlinking={true}
          delaySpeed={0}
          deleteSpeed={0}
          words={[
            `The first Junø Apes were a diverse and tumultuous horde. Among their
        ranks were mischievous pranksters, fearsome warriors, a few degenerates
        and a corgi. Yet despite their differences, the Junø Apes stood united
        as an unbreakable unit.`
          ]}
        />
      </Center>
      <Button
        initial={{ y: 200, opacity: 0 }}
        animate={{
          transition: {
            delay: 5,
            type: "spring",
            bounce: 0.3,
            damping: 8
          },
          y: 0,
          opacity: 1
        }}
        bg={"#212121"}
        textDecoration="none"
        rounded="3xl"
        href="https://www.omniflix.market/collection/onftdenomd7ba07c7b185461f862b9014c90a9e62"
        target="_blank"
        w={{ base: "20rem", md: "25rem" }}
        h="4rem"
        px={0}
        as={motion.a}
        color="black"
        _hover={{
          textDecor: "none"
        }}
        _active={{ bg: "#332d2d" }}
        overflow="visible"
        pos="relative"
        fontSize={{ base: "1em", md: "1.2em" }}
      >
        <Flex
          as={motion.button}
          whileHover={{ y: -10, x: -10 }}
          whileTap={{ y: -6, x: -6 }}
          justifyContent="center"
          alignItems="center"
          pos="relative"
          onHoverStart={() => {
            setIsHovered(true)
          }}
          onHoverEnd={() => {
            setIsHovered(false)
          }}
          // @ts-ignore
          style={{ x: -5, y: -5, fontSize: "1em" }}
          rounded="1.25rem"
          w="full"
          h="full"
          bg="#f0827d"
          _hover={{ background: "#fc9792" }}
          transition="0.25s background"
          overflowY="hidden"
          direction="column"
          color={"white"}
        >
          <Flex
            as={motion.div}
            animate={isHovered ? { y: -70 } : { y: 0 }}
            pos="absolute"
            top="0"
            w="full"
            h="full"
            fontSize="1.4em"
            justifyContent="center"
            alignItems="center"
            fontFamily="heading"
            css={{ WebkitTextStroke: "2px #212121" }}
          >
            Get your OG Junø Ape
          </Flex>

          <Flex
            as={motion.div}
            animate={isHovered ? { y: 0 } : { y: 70 }}
            pos="absolute"
            top="0"
            w="full"
            h="full"
            initial={{ y: 70 }}
            fontSize="1.4em"
            css={{ WebkitTextStroke: "2px #212121" }}
            fontFamily="heading"
            justifyContent="center"
            alignItems="center"
          >
            ONE OF US! ONE OF US!
          </Flex>
        </Flex>
      </Button>
    </MotionFlex>
  )
}

export default SomeText
