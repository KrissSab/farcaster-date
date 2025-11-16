import { useState, useEffect } from 'react'

interface User {
  fid: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

interface ProfilePageProps {
  user: User
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  const [datyBalance, setDatyBalance] = useState(0)

  // Generate random DATY token balance on mount
  useEffect(() => {
    const randomBalance = Math.floor(Math.random() * 10000) + 100
    setDatyBalance(randomBalance)
  }, [])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {/* Profile Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'center',
        }}>
          {/* Profile Picture */}
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: user.pfpUrl
              ? `url(${user.pfpUrl}) center/cover`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            margin: '0 auto 16px',
            border: '4px solid #667eea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
          }}>
            {!user.pfpUrl && '💜'}
          </div>

          {/* User Info */}
          <h1 style={{
            fontSize: '2rem',
            margin: '0 0 8px 0',
            fontWeight: 'bold',
          }}>
            {user.displayName || user.username || 'Anonymous'}
          </h1>
          {user.username && (
            <p style={{
              fontSize: '1rem',
              margin: '0 0 8px 0',
              color: '#666',
            }}>
              @{user.username}
            </p>
          )}
          <p style={{
            fontSize: '0.9rem',
            margin: '0',
            color: '#888',
          }}>
            FID: {user.fid}
          </p>
        </div>

        {/* DATY Token Balance */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '20px',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '1rem',
            opacity: 0.9,
            marginBottom: '8px',
          }}>
            DATY Token Balance
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}>
            {datyBalance.toLocaleString()}
          </div>
          <div style={{
            fontSize: '0.9rem',
            opacity: 0.8,
          }}>
            💎 DATY
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '20px',
            color: '#333',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}>
              0
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#666',
            }}>
              Profile Views
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '20px',
            color: '#333',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}>
              0
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#666',
            }}>
              Likes Sent
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '24px',
          color: '#333',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            margin: '0 0 20px 0',
            fontWeight: 'bold',
          }}>
            Settings
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {/* Setting Item */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #eee',
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  Notifications
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Get notified about new matches
                </div>
              </div>
              <div style={{
                width: '50px',
                height: '28px',
                background: '#51cf66',
                borderRadius: '14px',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  transition: 'all 0.2s',
                }}></div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #eee',
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  Show Online Status
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Let others see when you're active
                </div>
              </div>
              <div style={{
                width: '50px',
                height: '28px',
                background: '#ccc',
                borderRadius: '14px',
                position: 'relative',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: '2px',
                  transition: 'all 0.2s',
                }}></div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
            }}>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  Distance Preferences
                </div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>
                  Show profiles within 50 km
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: '#667eea',
              }}>
                ›
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
