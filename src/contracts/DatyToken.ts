// DATY Token Purchase Contract
// This is a simple contract deployed on Base Sepolia testnet
// Users can buy DATY tokens with ETH

export const DATY_TOKEN_CONTRACT = {
  // Base Sepolia testnet contract address (you'll need to deploy this)
  address: '0x0000000000000000000000000000000000000000' as `0x${string}`, // Replace with actual deployed address
  abi: [
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'buyTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const,
} as const

// Token package pricing (amount of DATY tokens and ETH price)
export const TOKEN_PACKAGES_CRYPTO = [
  {
    id: 'tokens_100',
    name: 'Starter Pack',
    amount: 100,
    ethPrice: '0.001', // 0.001 ETH on Base Sepolia
    icon: '💎',
  },
  {
    id: 'tokens_500',
    name: 'Popular Pack',
    amount: 500,
    ethPrice: '0.005',
    bonus: 50,
    icon: '💎',
  },
  {
    id: 'tokens_1000',
    name: 'Best Value',
    amount: 1000,
    ethPrice: '0.008',
    bonus: 200,
    icon: '💎',
  },
  {
    id: 'tokens_2500',
    name: 'Premium Pack',
    amount: 2500,
    ethPrice: '0.015',
    bonus: 750,
    icon: '💎',
  },
] as const
