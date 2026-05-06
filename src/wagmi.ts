import { cookieStorage, createConfig, createStorage, http, webSocket } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { fallback } from 'wagmi'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
      [sepolia.id]: fallback([
        webSocket(`wss://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
        http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`),
      ]),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
