import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Page404 = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => navigate("/")

  return (
    <Center flexDirection="column" textAlign="center">
      <Heading fontSize="5em">Page not Found</Heading>
      <VStack gap={4}>
        <Text fontSize="2xl">Don't be sad young ape, head right back!</Text>
        <Button
          rounded="0.9em"
          bg="white"
          _hover={{ bg: "gray.100" }}
          fontSize="1.3em"
          onClick={handleBackToHome}
        >
          Let&apos;s Head Back!
        </Button>
      </VStack>
    </Center>
  )
}

export default Page404
