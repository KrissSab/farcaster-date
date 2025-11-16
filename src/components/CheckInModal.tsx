import type { WeekDay } from '../hooks/useCheckIn'

interface CheckInModalProps {
  reward: number
  streak: number
  canClaim: boolean
  weekDays: WeekDay[]
  onClaim: () => void
  onClose: () => void
}

export const CheckInModal = ({ reward, streak, canClaim, weekDays, onClaim, onClose }: CheckInModalProps) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            padding: '32px 24px',
            maxWidth: '380px',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Title */}
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
          }}>
            Daily Check-In
          </h2>

          {/* Streak */}
          <div style={{
            fontSize: '1rem',
            opacity: 0.9,
            marginBottom: '24px',
          }}>
            🔥 {streak} Day Streak
          </div>

          {/* Weekly Calendar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '20px 16px',
            marginBottom: '20px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}>
              {weekDays.slice(0, 4).map((day, index) => (
                <div
                  key={index}
                  style={{
                    background: day.isCheckedIn
                      ? 'rgba(81, 207, 102, 0.3)'
                      : day.isToday
                      ? 'rgba(255, 255, 255, 0.25)'
                      : day.isFuture
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: day.isToday ? '2px solid white' : '2px solid transparent',
                    borderRadius: '12px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    opacity: day.isFuture ? 0.4 : 1,
                  }}
                >
                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    marginBottom: '4px',
                  }}>
                    {day.dayName}
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}>
                    {day.dayNumber}
                  </div>
                  <div style={{ fontSize: '1.2rem' }}>
                    {day.isCheckedIn ? '✓' : day.isFuture ? '○' : '✗'}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginTop: '12px',
              maxWidth: '75%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              {weekDays.slice(4, 7).map((day, index) => (
                <div
                  key={index + 4}
                  style={{
                    background: day.isCheckedIn
                      ? 'rgba(81, 207, 102, 0.3)'
                      : day.isToday
                      ? 'rgba(255, 255, 255, 0.25)'
                      : day.isFuture
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: day.isToday ? '2px solid white' : '2px solid transparent',
                    borderRadius: '12px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    opacity: day.isFuture ? 0.4 : 1,
                  }}
                >
                  <div style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    marginBottom: '4px',
                  }}>
                    {day.dayName}
                  </div>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}>
                    {day.dayNumber}
                  </div>
                  <div style={{ fontSize: '1.2rem' }}>
                    {day.isCheckedIn ? '✓' : day.isFuture ? '○' : '✗'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Display */}
          {canClaim && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.9,
                marginBottom: '4px',
              }}>
                Today's Reward
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
              }}>
                +{reward} 💎 DATY
              </div>
            </div>
          )}

          {/* Claim/Close Button */}
          {canClaim ? (
            <button
              onClick={onClaim}
              style={{
                width: '100%',
                padding: '16px',
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                color: '#667eea',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              Claim Reward
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.3)',
                border: '2px solid white',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          )}

          {/* Bonus Info */}
          {streak >= 7 && (
            <div style={{
              fontSize: '0.85rem',
              opacity: 0.85,
              marginTop: '16px',
              padding: '10px',
              background: 'rgba(255, 215, 0, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}>
              ⭐ {Math.floor(streak / 7)} week streak bonus active!
            </div>
          )}
        </div>
      </div>
    </>
  )
}
