import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import { useAuth } from './contexts/AuthContext'
import { useDating } from './hooks/useDating'
import { SwipeableCard } from './components/SwipeableCard'
import { MatchesList } from './components/MatchesList'
import { ProfilePage } from './components/ProfilePage'

type View = 'dating' | 'matches' | 'profile'

function App() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { currentProfile, hasMoreProfiles, matches, matchCount, handleLike, handlePass, handleRemoveMatch } = useDating()
  const [currentView, setCurrentView] = useState<View>('dating')
  const [bottomInset, setBottomInset] = useState(16)

  // Get safe area insets from Farcaster SDK
  useEffect(() => {
    const getSafeArea = async () => {
      try {
        const context = await sdk.context
        const inset = context.client.safeAreaInsets?.bottom || 0
        // Add extra padding if there's a bottom inset (wallet button area)
        setBottomInset(inset > 0 ? inset + 16 : 16)
      } catch (error) {
        console.log('Could not get safe area insets, using default')
        setBottomInset(16)
      }
    }
    getSafeArea()
  }, [])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <div style={{ fontSize: '3rem' }}>💜</div>
        <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>Loading Daty...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💔</div>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>Authentication Required</h2>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          Please open this app through Farcaster
        </p>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header with user profile */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {user?.pfpUrl && (
            <img
              src={user.pfpUrl}
              alt="Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid white'
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {user?.displayName || user?.username || 'Anonymous'}
            </div>
            {user?.username && (
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                @{user.username}
              </div>
            )}
          </div>
          <div style={{ fontSize: '1.5rem' }}>💜</div>
        </div>
      </div>

      {/* Main content area */}
      {currentView === 'dating' ? (
        <>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            gap: '20px'
          }}>
            {hasMoreProfiles && currentProfile ? (
              <SwipeableCard
                profile={currentProfile}
                onSwipeLeft={handlePass}
                onSwipeRight={handleLike}
              />
            ) : (
            <div style={{
              textAlign: 'center',
              maxWidth: '400px',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
              <h2 style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>
                {matchCount > 0 ? "Great job!" : "No more profiles"}
              </h2>
              <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '20px' }}>
                {matchCount > 0
                  ? `You've made ${matchCount} ${matchCount === 1 ? 'match' : 'matches'}! Check back later for more profiles.`
                  : "Check back later for more people to connect with."}
              </p>
              {matchCount > 0 && (
                <button
                  onClick={() => setCurrentView('matches')}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: '2px solid white',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  View Matches
                </button>
              )}
            </div>
          )}
          </div>

        </>
      ) : currentView === 'matches' ? (
        <MatchesList matches={matches} onRemove={handleRemoveMatch} />
      ) : (
        <ProfilePage user={user!} />
      )}

      {/* Bottom Navigation */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(102, 126, 234, 0.95)',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Navigation tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: `12px 20px ${bottomInset}px`,
          }}>
          <button
            onClick={() => setCurrentView('dating')}
            style={{
              flex: 1,
              padding: '14px 8px',
              background: currentView === 'dating'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: currentView === 'dating' ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            💝 Discover
          </button>
          <button
            onClick={() => setCurrentView('matches')}
            style={{
              flex: 1,
              padding: '14px 8px',
              background: currentView === 'matches'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: currentView === 'matches' ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>💚 Matches</span>
            {matchCount > 0 && (
              <span style={{
                background: '#51cf66',
                color: 'white',
                borderRadius: '10px',
                padding: '2px 8px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                minWidth: '20px',
                textAlign: 'center',
              }}>
                {matchCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            style={{
              flex: 1,
              padding: '14px 8px',
              background: currentView === 'profile'
                ? 'rgba(255, 255, 255, 0.3)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: currentView === 'profile' ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            👤 Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default App