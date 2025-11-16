interface Profile {
  fid: number
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
}

interface MatchesListProps {
  matches: Profile[]
  onRemove: (fid: number) => void
}

export const MatchesList = ({ matches, onRemove }: MatchesListProps) => {
  if (matches.length === 0) {
    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>💔</div>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>No matches yet</h2>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          Start swiping to find your matches!
        </p>
      </div>
    )
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        margin: '0 0 20px 0',
        textAlign: 'center',
      }}>
        Your Matches ({matches.length})
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {matches.map((profile) => (
          <div
            key={profile.fid}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Profile picture */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              background: profile.pfpUrl
                ? `url(${profile.pfpUrl}) center/cover`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'white',
              flexShrink: 0,
            }}>
              {!profile.pfpUrl && '💜'}
            </div>

            {/* Profile info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontSize: '1.2rem',
                margin: '0 0 4px 0',
                fontWeight: 'bold',
              }}>
                {profile.displayName}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                margin: '0 0 8px 0',
                color: '#666',
              }}>
                @{profile.username}
              </p>
              {profile.bio && (
                <p style={{
                  fontSize: '0.85rem',
                  margin: '0',
                  color: '#444',
                  lineHeight: '1.4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Remove button */}
            <button
              onClick={() => onRemove(profile.fid)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #ff6b6b',
                background: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.9)'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              title="Remove match"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
