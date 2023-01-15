import { useColorMode } from "@chakra-ui/react"
import {
  ChainWalletBase,
  ModalVersion,
  WalletModalProps
} from "@cosmos-kit/core"
import { useMemo, useRef } from "react"
import { ReactNode, useEffect, useState } from "react"

import { SimpleConnectModal as ConnectModal } from "./components/SimpleConnectModal"
import { DisplayType } from "./types"
import { getSingleWalletView, getWalletListView } from "./utils"

export const getModal = (version: ModalVersion) => {
  return ({ isOpen, setOpen, walletRepo, theme }: WalletModalProps) => {
    const initialFocus = useRef()
    const [display, setDisplay] = useState<DisplayType>("list")
    const [qrCodeWallet, setQRCodeWallet] = useState<
      ChainWalletBase | undefined
    >()
    const [modalHead, setModalHead] = useState<ReactNode>()
    const [modalContent, setModalContent] = useState<ReactNode>()

    const [colorMode, setColorMode] = useState<string | null>("light")
    const { colorMode: _colorMode } = useColorMode()

    const wallets = walletRepo?.wallets
    const current = walletRepo?.current

    const singleViewDeps = [
      current,
      current?.walletStatus,
      current?.qrUrl,
      current?.message,
      qrCodeWallet?.qrUrl,
      qrCodeWallet?.message,
      display
    ]
    const listViewDeps = [wallets]

    const [singleViewHead, singleViewContent] = useMemo(
      () =>
        getSingleWalletView(
          version,
          current,
          qrCodeWallet,
          setOpen,
          setDisplay,
          setQRCodeWallet
        ),
      singleViewDeps
    )

    const [listViewHead, listViewContent] = useMemo(
      () =>
        getWalletListView(
          version,
          current,
          wallets,
          setOpen,
          setDisplay,
          setQRCodeWallet,
          initialFocus
        ),
      listViewDeps
    )

    useEffect(() => {
      if (
        display === "list" ||
        (!current && !qrCodeWallet) ||
        (current && current.walletStatus === "Disconnected")
      ) {
        setModalHead(listViewHead)
        setModalContent(listViewContent)
      } else {
        setModalHead(singleViewHead)
        setModalContent(singleViewContent)
      }
    }, [...singleViewDeps, ...listViewDeps, display])

    useEffect(() => {
      setColorMode(window.localStorage.getItem("chakra-ui-color-mode"))
    }, [_colorMode])

    const modal = (
      <ConnectModal
        modalIsOpen={isOpen}
        modalOnClose={() => {
          if (!current || current.walletStatus === "Disconnected") {
            setDisplay("list")
          } else {
            setDisplay("single")
          }
          setQRCodeWallet(void 0)
          setOpen(false)
        }}
        modalHead={modalHead}
        modalContent={modalContent}
        initialRef={initialFocus}
      />
    )

    return modal
  }
}
