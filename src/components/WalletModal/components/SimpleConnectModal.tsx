import {
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorMode
} from "@chakra-ui/react"
import { handleChangeColorModeValue } from "./DefaultComponent"

import { ConnectModalType } from "./types"

export const SimpleConnectModal = ({
  initialRef,
  modalHead,
  modalContent,
  modalIsOpen,
  modalOnClose
}: ConnectModalType) => {
  const { colorMode } = useColorMode()

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={modalIsOpen}
      isCentered={true}
      onClose={modalOnClose}
      size="xl"
    >
      <ModalOverlay bg="transparent" backdropFilter="blur(70px)" />
      <ModalContent
        position="relative"
        alignSelf="center"
        borderRadius="1.5em"
        bg={handleChangeColorModeValue(colorMode, "white", "#332D2D")}
        shadow="none"
        pb={4}
        mx={4}
        _focus={{ outline: "none" }}
        overflow="hidden"
      >
        <Stack flex={1} spacing={1} h="full">
          {modalHead}
          {modalContent}
        </Stack>
      </ModalContent>
    </Modal>
  )
}
