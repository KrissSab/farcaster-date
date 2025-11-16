interface Profile {
  fid: number
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
}

interface ProfileCardProps {
  profile: Profile
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    }}>
      {/* Profile image */}
      <div style={{
        width: '100%',
        height: '400px',
        background: profile.pfpUrl
          ? `url(${profile.pfpUrl}) center/cover`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '8rem',
        color: 'white',
      }}>
        {!profile.pfpUrl && '💜'}
      </div>

      {/* Profile info */}
      <div style={{
        padding: '24px',
        color: '#333',
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          margin: '0 0 8px 0',
          fontWeight: 'bold',
        }}>
          {profile.displayName}
        </h2>
        <p style={{
          fontSize: '1rem',
          margin: '0 0 12px 0',
          color: '#666',
        }}>
          @{profile.username}
        </p>
        {profile.bio && (
          <p style={{
            fontSize: '1rem',
            margin: '0',
            color: '#444',
            lineHeight: '1.5',
          }}>
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
