import { useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

function App() {
  useEffect(() => {
    const load = async () => {
      await sdk.actions.ready()
    }
    load()
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0px',
      margin: '0px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', margin: '0' }}>🚀</h1>
      <h2 style={{ fontSize: '2rem', margin: '20px 0' }}>Release Soon!</h2>
      <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
        Something amazing is coming to Farcaster
      </p>
    </div>
  )
}

export default App