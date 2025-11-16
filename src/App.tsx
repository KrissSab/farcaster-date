import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useDating } from './hooks/useDating'
import { SwipeableCard } from './components/SwipeableCard'
import { MatchesList } from './components/MatchesList'
import { ProfilePage } from './components/ProfilePage'
import { SettingsPage } from './components/SettingsPage'

type View = 'dating' | 'matches' | 'profile' | 'settings'

function App() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { currentProfile, hasMoreProfiles, matches, matchCount, handleLike, handlePass, handleRemoveMatch } = useDating()
  const [currentView, setCurrentView] = useState<View>('dating')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      height: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header with logo and menu */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: '81px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          💜 <span>Daty</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            maxWidth: '40px',
            maxHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
          >
            <rect x="2" y="4" width="16" height="2" rx="1" fill="white"/>
            <rect x="2" y="9" width="16" height="2" rx="1" fill="white"/>
            <rect x="2" y="14" width="16" height="2" rx="1" fill="white"/>
          </svg>
        </button>
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
      ) : currentView === 'profile' ? (
        <ProfilePage user={user!} />
      ) : (
        <SettingsPage />
      )}

      {/* Menu Drawer */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />

          {/* Drawer */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '280px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Menu Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxHeight: '81px',
              boxSizing: 'border-box',
            }}>
              {user?.pfpUrl && (
                <img
                  src={user.pfpUrl}
                  alt="Profile"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white' }}>
                  {user?.displayName || user?.username || 'Anonymous'}
                </div>
                {user?.username && (
                  <div style={{ fontSize: '0.85rem', opacity: 0.8, color: 'white' }}>
                    @{user.username}
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  minWidth: '40px',
                  minHeight: '40px',
                  maxWidth: '40px',
                  maxHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block' }}
                >
                  <rect 
                    x="3.757" 
                    y="15.556" 
                    width="16" 
                    height="2" 
                    rx="1" 
                    transform="rotate(-45 3.757 15.556)" 
                    fill="white"
                  />
                  <rect 
                    x="5.171" 
                    y="4.243" 
                    width="16" 
                    height="2" 
                    rx="1" 
                    transform="rotate(45 5.171 4.243)" 
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <div style={{
              flex: 1,
              padding: '12px 0',
            }}>
              <button
                onClick={() => {
                  setCurrentView('dating')
                  setIsMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: currentView === 'dating' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: currentView === 'dating' ? 'bold' : 'normal',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>💝</span>
                <span>Discover</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('matches')
                  setIsMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: currentView === 'matches' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: currentView === 'matches' ? 'bold' : 'normal',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>💚</span>
                <span>Matches</span>
                {matchCount > 0 && (
                  <span style={{
                    marginLeft: 'auto',
                    background: '#51cf66',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}>
                    {matchCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setCurrentView('profile')
                  setIsMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: currentView === 'profile' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: currentView === 'profile' ? 'bold' : 'normal',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>👤</span>
                <span>Profile</span>
              </button>

              <div style={{
                height: '1px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '12px 24px',
              }} />

              <button
                onClick={() => {
                  setCurrentView('settings')
                  setIsMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: currentView === 'settings' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: currentView === 'settings' ? 'bold' : 'normal',
                }}
              >
                <span style={{ fontSize: '1.3rem' }}>⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App