interface CheckInModalProps {
  reward: number
  streak: number
  onClose: () => void
}

export const CheckInModal = ({ reward, streak, onClose }: CheckInModalProps) => {
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
            padding: '40px 30px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Icon */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px',
            animation: 'bounce 0.6s ease-in-out',
          }}>
            🎉
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
          }}>
            Daily Check-In!
          </h2>

          {/* Reward */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
          }}>
            <div style={{
              fontSize: '1rem',
              opacity: 0.9,
              marginBottom: '8px',
            }}>
              You earned
            </div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}>
              +{reward}
            </div>
            <div style={{
              fontSize: '1.2rem',
              opacity: 0.9,
            }}>
              💎 DATY Tokens
            </div>
          </div>

          {/* Streak */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
          }}>
            <div style={{
              fontSize: '1rem',
              opacity: 0.9,
              marginBottom: '4px',
            }}>
              Current Streak
            </div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}>
              🔥 {streak} {streak === 1 ? 'day' : 'days'}
            </div>
          </div>

          {/* Bonus Info */}
          {streak >= 7 && (
            <div style={{
              fontSize: '0.9rem',
              opacity: 0.85,
              marginBottom: '20px',
              padding: '12px',
              background: 'rgba(255, 215, 0, 0.2)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 215, 0, 0.3)',
            }}>
              ⭐ {Math.floor(streak / 7)} week streak bonus active!
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
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
            Awesome!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  )
}
