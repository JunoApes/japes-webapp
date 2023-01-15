/* eslint-disable sonarjs/no-small-switch */
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { wallets as vectisWallets } from "@cosmos-kit/vectis";
import { wallets as wcv2Wallets } from "@cosmos-kit/walletconnect-v2";
import { Decimal } from "@cosmjs/math";
import { GasPrice } from "@cosmjs/stargate";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import type { Chain } from "@chain-registry/types";
import { assets, chains } from "chain-registry";
import { MotionConfig } from "framer-motion";

import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { theme } from "lib/styles/theme";
import { ChainProvider } from "@cosmos-kit/react";
import { getModal } from "lib/pages/home/components/WalletModal";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        modalTheme={theme}
        key="chainProvider"
        sessionOptions={{ killOnTabClose: false }}
        walletModal={getModal("simple_v2")}
        wallets={[
          ...wcv2Wallets,
          ...keplrWallets,
          ...cosmostationWallets,
          ...leapWallets,
          ...vectisWallets,
        ]}
        defaultNameService="stargaze"
        wcSignClientOptions={{
          projectId: import.meta.env.VITE_WCCLIENT,
          relayUrl: "wss://relay.walletconnect.org",
          name: "Junø Apes - Web App",
          metadata: {
            description: "Junø Apes - Web App at https://japes.club",
            icons: ["/assets/logo_transparent.png"],
            url: "https://japes.club",
            name: "Junø Apes - Web App",
          },
        }}
        signerOptions={{
          signingStargate: (chain: Chain) => {
            switch (chain.chain_name) {
              case "juno":
                return {
                  gasPrice: new GasPrice(
                    Decimal.fromUserInput("25000", 2),
                    "ujuno"
                  ),
                };
              default:
                return undefined;
            }
          },
        }}
      >
        <Router>
          <MotionConfig
            transition={{ type: "spring", bounce: 0.4, damping: 7 }}
          >
            <Layout>
              <Routings />
            </Layout>
          </MotionConfig>
        </Router>
      </ChainProvider>
    </ChakraProvider>
  );
};

export default App;
