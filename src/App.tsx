import { useAuth } from './contexts/AuthContext'
import { useDating } from './hooks/useDating'
import { ProfileCard } from './components/ProfileCard'

function App() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { currentProfile, hasMoreProfiles, matchCount, handleLike, handlePass } = useDating()

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
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Header with user profile */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
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

      {/* Main content area */}
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
        {/* Match counter */}
        {matchCount > 0 && (
          <div style={{
            position: 'absolute',
            top: '90px',
            right: '20px',
            background: 'rgba(81, 207, 102, 0.9)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
          }}>
            💚 {matchCount} {matchCount === 1 ? 'Match' : 'Matches'}
          </div>
        )}

        {hasMoreProfiles && currentProfile ? (
          <ProfileCard
            profile={currentProfile}
            onLike={handleLike}
            onPass={handlePass}
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
            <p style={{ fontSize: '1rem', opacity: 0.9 }}>
              {matchCount > 0
                ? `You've made ${matchCount} ${matchCount === 1 ? 'match' : 'matches'}! Check back later for more profiles.`
                : "Check back later for more people to connect with."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App