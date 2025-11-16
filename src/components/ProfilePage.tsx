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

const PROFILE_STORAGE_KEY = 'daty_user_profile'
const CHECKIN_STORAGE_KEY = 'daty_checkin_data'

interface UserProfile {
  displayName: string
  bio: string
  avatarUrl: string
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  const [datyBalance, setDatyBalance] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    displayName: user.displayName || user.username || 'Anonymous',
    bio: '',
    avatarUrl: user.pfpUrl || '',
  })
  const [editForm, setEditForm] = useState<UserProfile>(profile)

  // Load saved profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (saved) {
      const savedProfile = JSON.parse(saved)
      setProfile(savedProfile)
      setEditForm(savedProfile)
    } else {
      // Save initial profile
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    }
  }, [])

  // Load actual DATY token balance from check-in data
  useEffect(() => {
    const loadBalance = () => {
      const stored = localStorage.getItem(CHECKIN_STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        setDatyBalance(data.tokensEarned || 0)
      }
    }

    loadBalance()

    // Poll for balance updates every second
    const interval = setInterval(loadBalance, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSave = () => {
    setProfile(editForm)
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(editForm))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      minHeight: 0,
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
          position: 'relative',
        }}>
          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#667eea',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Edit Profile
            </button>
          )}

          {isEditing ? (
            /* Edit Mode */
            <div style={{ textAlign: 'left' }}>
              <h2 style={{
                fontSize: '1.5rem',
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
                Edit Profile
              </h2>

              {/* Avatar URL */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  marginBottom: '6px',
                  fontWeight: 'bold',
                  color: '#666',
                }}>
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={editForm.avatarUrl}
                  onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Display Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  marginBottom: '6px',
                  fontWeight: 'bold',
                  color: '#666',
                }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Bio */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  marginBottom: '6px',
                  fontWeight: 'bold',
                  color: '#666',
                }}>
                  Bio
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
              }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#667eea',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#e0e0e0',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#666',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <>
              {/* Profile Picture */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: profile.avatarUrl
                  ? `url(${profile.avatarUrl}) center/cover`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto 16px',
                border: '4px solid #667eea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'white',
              }}>
                {!profile.avatarUrl && '💜'}
              </div>

              {/* User Info */}
              <h1 style={{
                fontSize: '2rem',
                margin: '0 0 8px 0',
                fontWeight: 'bold',
              }}>
                {profile.displayName}
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
              {profile.bio && (
                <p style={{
                  fontSize: '0.95rem',
                  margin: '12px 0 8px 0',
                  color: '#555',
                  lineHeight: '1.5',
                  maxWidth: '400px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                  {profile.bio}
                </p>
              )}
              <p style={{
                fontSize: '0.9rem',
                margin: '8px 0 0 0',
                color: '#888',
              }}>
                FID: {user.fid}
              </p>
            </>
          )}
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
      </div>
    </div>
  )
}
