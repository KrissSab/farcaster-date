import { useEffect, useState } from 'react'
import sdk from '@farcaster/frame-sdk'

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        // Check if we're in localhost (skip wallet connection)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

        if (isLocalhost) {
          setIsReady(true)
          return
        }

        // Initialize Farcaster SDK with wallet
        const context = await sdk.context

        if (context?.user) {
          setIsReady(true)
        }
      } catch (error) {
        console.error('Wallet initialization error:', error)
        setIsReady(true)
      }
    }

    init()
  }, [])

  const connectWallet = async () => {
    try {
      // In a real Farcaster frame, the wallet is already connected
      // This is just for dev purposes
      setIsConnected(true)
      setAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')
      return true
    } catch (error) {
      console.error('Wallet connection error:', error)
      return false
    }
  }

  return {
    isConnected,
    address,
    isReady,
    connectWallet,
  }
}
