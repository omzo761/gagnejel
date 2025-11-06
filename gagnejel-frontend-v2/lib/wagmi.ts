import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

export const CONTRACTS = {
  ESCROW_ADDRESS: '0xeD764c14F9B0c2BED250bD3d00AA117128294ABC',
  USDC_ADDRESS: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
}

export const API_URL = 'http://localhost:5000/api'