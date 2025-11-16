import { useState, useRef } from 'react'

interface Profile {
  fid: number
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
}

interface SwipeableCardProps {
  profile: Profile
  onSwipeLeft: () => void
  onSwipeRight: () => void
  isPremium?: boolean
  premiumAmount?: number
}

export const SwipeableCard = ({ profile, onSwipeLeft, onSwipeRight, isPremium = false, premiumAmount = 5 }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartPos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY

    setDragOffset({
      x: currentX - startPos.x,
      y: currentY - startPos.y,
    })
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPos({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const currentX = e.clientX
    const currentY = e.clientY

    setDragOffset({
      x: currentX - startPos.x,
      y: currentY - startPos.y,
    })
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd()
    }
  }

  // Unified drag end handler
  const handleDragEnd = () => {
    setIsDragging(false)

    const threshold = 100

    if (dragOffset.x > threshold) {
      // Swiped right - Like
      animateSwipeOut('right')
    } else if (dragOffset.x < -threshold) {
      // Swiped left - Pass
      animateSwipeOut('left')
    } else {
      // Return to center
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const animateSwipeOut = (direction: 'left' | 'right') => {
    const finalX = direction === 'right' ? 500 : -500
    setDragOffset({ x: finalX, y: dragOffset.y })

    setTimeout(() => {
      if (direction === 'right') {
        onSwipeRight()
      } else {
        onSwipeLeft()
      }
      setDragOffset({ x: 0, y: 0 })
    }, 300)
  }

  const rotation = dragOffset.x / 20
  const opacity = 1 - Math.abs(dragOffset.x) / 400

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity: opacity,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* Premium mode badge */}
      {isPremium && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          color: '#333',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '1rem' }}>💎</span>
          Premium Mode • {premiumAmount} DATY
        </div>
      )}

      {/* Swipe indicators */}
      {dragOffset.x > 20 && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: isPremium ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' : '#51cf66',
          color: isPremium ? '#333' : 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 10,
          opacity: Math.min(Math.abs(dragOffset.x) / 100, 1),
          transform: `rotate(-15deg)`,
          boxShadow: isPremium ? '0 4px 12px rgba(255, 215, 0, 0.5)' : 'none',
        }}>
          {isPremium ? '💎 PREMIUM' : 'LIKE'}
        </div>
      )}
      {dragOffset.x < -20 && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: '#ff6b6b',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 10,
          opacity: Math.min(Math.abs(dragOffset.x) / 100, 1),
          transform: `rotate(15deg)`,
        }}>
          NOPE
        </div>
      )}

      {/* Profile image */}
      <div style={{
        width: '100%',
        height: '340px',
        background: profile.pfpUrl
          ? `url(${profile.pfpUrl}) center/cover`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6rem',
        color: 'white',
      }}>
        {!profile.pfpUrl && '💜'}
      </div>

      {/* Profile info */}
      <div style={{
        padding: '16px 20px',
        color: '#333',
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          margin: '0 0 4px 0',
          fontWeight: 'bold',
        }}>
          {profile.displayName}
        </h2>
        <p style={{
          fontSize: '0.9rem',
          margin: '0 0 8px 0',
          color: '#666',
        }}>
          @{profile.username}
        </p>
        {profile.bio && (
          <p style={{
            fontSize: '0.9rem',
            margin: '0',
            color: '#444',
            lineHeight: '1.4',
          }}>
            {profile.bio}
          </p>
        )}
      </div>
    </div>
  )
}
