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
      </div>
    </div>
  )
}
