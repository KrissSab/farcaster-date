import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { sdk } from '@farcaster/frame-sdk'

interface User {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Development mode: skip auth on localhost
        const isLocalhost = window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.includes('localhost')

        if (isLocalhost) {
          console.log('🔧 Development mode: Using mock user')
          setUser({
            fid: 999999,
            username: 'dev_user',
            displayName: 'Dev User',
            pfpUrl: undefined,
          })
          setIsLoading(false)
          return
        }

        // Production mode: use Farcaster SDK
        await sdk.actions.ready()

        // Get user context from SDK
        const context = await sdk.context

        if (context?.user) {
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
            pfpUrl: context.user.pfpUrl,
          })
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
