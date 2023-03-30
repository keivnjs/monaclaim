import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { argentWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient, configureChains, WagmiConfig, goerli } from "wagmi";
import { Chain } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const rinkeby: Chain = {
  id: 5,
  name: "Goerli",
  network: "goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: { http: ["https://eth-goerli.g.alchemy.com/v2/demo"] },
    default: { http: ["https://rpc.ankr.com/eth_goerli"] },
    infura: {
      http: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    },
    public: { http: ["https://rpc.ankr.com/eth_goerli"] },
  },
  blockExplorers: {
    etherscan: { name: "Etherscan", url: "https://goerli.etherscan.io" },
    default: { name: "Etherscan", url: "https://goerli.etherscan.io" },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10299530,
    },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Monaverse Mint NFT Demo",
  chains,
});

const demoAppInfo = {
  appName: "Monaverse Mint NFT Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={demoAppInfo}
        chains={chains}
        theme={darkTheme()}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
