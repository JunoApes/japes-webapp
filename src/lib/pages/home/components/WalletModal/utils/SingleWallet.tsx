/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Center, Icon, Skeleton, Text } from "@chakra-ui/react";
import { ChainWalletBase, ModalVersion } from "@cosmos-kit/core";
import { IconType } from "react-icons";
import { BiLogOut } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import { RiDoorOpenFill } from "react-icons/ri";

import {
  ConnectModalContentType,
  ConnectWalletButton,
  CopyAddressButton,
  DownloadWalletButtonType,
  LogoStatus,
  SimpleDisplayModalContent,
  SimpleInstallWalletButton,
  SimpleModalHead,
  SimpleModalHeadType,
  SimpleQRCode,
} from "../components";
import { DisplayType, ModalInfo } from "../types";

export const getSingleWalletView = (
  version: ModalVersion,
  current: ChainWalletBase | undefined,
  qrCodeWallet: ChainWalletBase | undefined,
  setOpen: (isOpen: boolean) => void,
  setDisplay: (display: DisplayType) => void,
  setQRCodeWallet: (wallet: ChainWalletBase | undefined) => void
) => {
  let ModalContent: (props: ConnectModalContentType) => JSX.Element,
    InstallWalletButton: (props: DownloadWalletButtonType) => JSX.Element,
    QRCode: (props: { link: string; description?: string }) => JSX.Element,
    ModalHead: (props: SimpleModalHeadType) => JSX.Element;
  switch (version) {
    case "simple_v1":
      ModalContent = SimpleDisplayModalContent;
      InstallWalletButton = SimpleInstallWalletButton;
      QRCode = SimpleQRCode;
      ModalHead = SimpleModalHead;
      break;
    case "simple_v2":
      ModalContent = SimpleDisplayModalContent;
      InstallWalletButton = SimpleInstallWalletButton;
      QRCode = SimpleQRCode;
      ModalHead = SimpleModalHead;
      break;
  }

  if (qrCodeWallet && qrCodeWallet.walletStatus === "Disconnected") {
    const displayName =
      qrCodeWallet.walletInfo.prettyName || qrCodeWallet.walletName;

    const modalHead = (
      <ModalHead
        title={displayName}
        backButton={true}
        handleClose={() => {
          setOpen(false);
          setQRCodeWallet(void 0);
          setDisplay("list");
        }}
        handleBack={() => setDisplay("list")}
      />
    );

    if (
      qrCodeWallet.message === "Initializing QR code..." &&
      qrCodeWallet.qrUrl === ""
    ) {
      return [
        modalHead,
        <Center
          flexDirection="column"
          minW={72}
          minH={40}
          p={6}
          textAlign="center"
        >
          <Text>Initializing QRCode</Text>
          <Skeleton rounded="3xl" w={"20rem"} h={"20rem"} borderRadius="base" />
        </Center>,
      ];
    }

    return [
      modalHead,
      <QRCode
        link={qrCodeWallet.qrUrl!}
        description={`Open ${displayName} on your mobile and scan the QR code below.`}
      />,
    ];
  }

  if (!current) {
    return [void 0, void 0];
  }

  const {
    walletInfo: { prettyName, name, logo },
    walletStatus: status,
    downloadInfo,
    isMobile,
    connect,
    disconnect,
    qrUrl,
    rejectMessageTarget,
    message,
    username,
    address,
  } = current!;

  const displayName = prettyName || name;

  const modalInfo: ModalInfo = {
    NotExist: {
      logoStatus: LogoStatus.Error,
      header: `${displayName} can't be found`,
      buttonText: `Install ${displayName}`,
      desc: downloadInfo?.link
        ? `If ${displayName} is installed on your device, please refresh this page or follow the wallet's setup instructions.`
        : `Download link not provided. Try searching it or consulting the developer team.`,
      onClick: () => {
        window.open(downloadInfo?.link, "_blank");
      },
      buttonDisabled: downloadInfo?.link ? false : true,
      icon: downloadInfo?.icon || GoDesktopDownload,
    },
    Disconnected: {
      logoStatus: LogoStatus.Warning,
      header: isMobile ? "Wallet Authorization" : "Wallet is Disconnected",
      desc: isMobile ? "Approve connection in wallet app" : void 0,
      buttonText: isMobile ? "Open App" : "Connect Wallet",
      onClick: () => connect(),
      bottomLink:
        isMobile && downloadInfo ? (
          <Button
            variant="link"
            onClick={() => {
              window.open(downloadInfo?.link, "_blank");
            }}
          >
            <Text as="u" fontSize="sm">
              don't have a wallet?
            </Text>
          </Button>
        ) : (
          void 0
        ),
    },
    Connected: {
      buttonText: "Disconnect",
      onClick: async () => {
        await disconnect();
        setDisplay("list");
      },
      icon: <Icon as={BiLogOut} />,
    },
    Connecting: {
      logoStatus: LogoStatus.Loading,
      header: `Attempting to reach ${current?.chain.pretty_name}...`,
      desc: qrUrl
        ? `Approve the connection request on your mobile.`
        : isMobile
        ? `Open ${displayName} to connect your wallet.`
        : `If there isn't a modal popping up, check your internet connection or extension status.`,
    },
    Rejected: {
      logoStatus: LogoStatus.Error,
      header: "Request Rejected",
      desc: rejectMessageTarget || "Connection permission is denied.",
      buttonText: "Reconnect",
      onClick: () => connect(),
    },
    Error: {
      logoStatus: LogoStatus.Error,
      header: "Oops! Something wrong...",
      desc: message,
      buttonText: "Change Wallet",
      onClick: () => setDisplay("list"),
    },
  };

  function getBottomButton() {
    const info = modalInfo[status];
    switch (status) {
      case "Connecting":
        return void 0;
      case "NotExist":
        return (
          <InstallWalletButton
            icon={info.icon as IconType}
            text={info.buttonText}
            onClick={info.onClick}
            disabled={info.buttonDisabled || false}
          />
        );
      default:
        return (
          <ConnectWalletButton
            size="lg"
            variant="primary"
            leftIcon={info.icon}
            buttonText={info.buttonText}
            onClickConnectBtn={info.onClick}
          />
        );
    }
  }

  function getModalContent() {
    if (status === "Connected") {
      return (
        <ModalContent
          logo={""}
          username={username}
          walletIcon={(typeof logo === "string" && logo) || void 0}
          addressButton={
            <CopyAddressButton size="sm" isRound={true} address={address} />
          }
          bottomButton={getBottomButton()}
        />
      );
    }

    const info = modalInfo[status];

    return (
      <ModalContent
        status={info.logoStatus}
        logo={logo}
        contentHeader={info.header}
        contentDesc={info.desc}
        bottomButton={getBottomButton()}
        bottomLink={info.bottomLink}
      />
    );
  }

  return [
    <ModalHead
      title={displayName}
      backButton={true}
      handleClose={() => {
        setOpen(false);
        if (status === "Connecting") {
          disconnect();
        }
        setQRCodeWallet(void 0);
        setDisplay("single");
      }}
      handleBack={() => setDisplay("list")}
    />,
    getModalContent(),
  ];
};
