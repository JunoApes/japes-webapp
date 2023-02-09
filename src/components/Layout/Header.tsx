import { Flex, HStack, Icon, Spacer } from "@chakra-ui/react"
import { CrewThreeIcon } from "components/Assets/CrewThreeIcon"
import ConnectButton from "components/ConnectButton"
import SocialMediaButton from "components/SocialMediaButton"
import { FaTelegramPlane, FaTwitter } from "react-icons/fa"

import MenuToggle from "../MenuToggle"
import ThemeToggle from "../ThemeToggle"

const Header = () => {
  return (
    <Flex as="header" w="full" align="center" justifyContent="flex-end" gap={2}>
      <ConnectButton />
      <Spacer />
      <HStack pe={1}>
        <SocialMediaButton
          tooltip="Join the other apes on Telegram!"
          socialLink="https://t.me/junounofficialapes"
          icon={<Icon as={FaTelegramPlane} />}
          socialName={"telegram"}
        />
        <SocialMediaButton
          tooltip="Follow Junø Apes on Twitter!"
          socialLink="https://twitter.com/juno_apes"
          icon={<Icon as={FaTwitter} />}
          socialName={"twitter"}
        />
        {/* <SocialMediaButton
          tooltip="Complete quests to earn $JAPE!"
          socialLink="https://t.me/junounofficialapes"
          icon={<Icon as={CrewThreeIcon} />}
          socialName={"crew"}
        /> */}
      </HStack>
      <ThemeToggle />
      <MenuToggle />
    </Flex>
  )
}

export default Header
