export const SettingsPage = () => {
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

        {/* Danger Zone */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '24px',
          color: '#333',
          marginTop: '20px',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            margin: '0 0 12px 0',
            fontWeight: 'bold',
            color: '#e03131',
          }}>
            Danger Zone
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{
              padding: '16px',
              background: '#fff5f5',
              border: '1px solid #ffc9c9',
              borderRadius: '12px',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#e03131' }}>
                Clear All Data
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '12px' }}>
                This will delete all your matches, check-in history, and preferences. This action cannot be undone.
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all data? This cannot be undone!')) {
                    localStorage.clear()
                    window.location.reload()
                  }
                }}
                style={{
                  padding: '10px 20px',
                  background: '#e03131',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
