import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { defineChain as thirdwebChain, createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("VITE_THIRDWEB_CLIENT_ID is not set. Get your client ID from https://thirdweb.com");
}

export const client = createThirdwebClient({
  clientId,
});

export const chain = baseSepolia;

export const config = createConfig({
  chains: [chain],
  connectors: [
    inAppWalletConnector({
      client,
      smartAccount: {
        chain: thirdwebChain(chain),
        sponsorGas: true,
      },
    }),
  ],
  transports: {
    [chain.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
