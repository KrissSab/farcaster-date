import { useState, useEffect } from 'react'

interface MarketplaceItem {
  id: string
  name: string
  description: string
  price: number
  icon: string
  category: 'boost' | 'feature' | 'cosmetic'
}

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'profile_boost_24h',
    name: '24h Profile Boost',
    description: 'Increase your profile visibility for 24 hours',
    price: 50,
    icon: '🚀',
    category: 'boost',
  },
  {
    id: 'super_like_3',
    name: '3 Super Likes',
    description: 'Stand out with special likes that notify the person',
    price: 30,
    icon: '⭐',
    category: 'feature',
  },
  {
    id: 'unlimited_swipes_7d',
    name: '7 Days Unlimited Swipes',
    description: 'No daily limit on swipes for 7 days',
    price: 100,
    icon: '♾️',
    category: 'feature',
  },
  {
    id: 'profile_badge_verified',
    name: 'Verified Badge',
    description: 'Show you\'re a trusted member of the community',
    price: 200,
    icon: '✓',
    category: 'cosmetic',
  },
  {
    id: 'theme_gold',
    name: 'Gold Theme',
    description: 'Premium gold color theme for your profile',
    price: 150,
    icon: '👑',
    category: 'cosmetic',
  },
  {
    id: 'undo_swipe_5',
    name: '5 Undo Swipes',
    description: 'Take back your last swipe decision',
    price: 25,
    icon: '↩️',
    category: 'feature',
  },
]

const STORAGE_KEY = 'daty_checkin_data'

export const MarketplacePage = () => {
  const [balance, setBalance] = useState(0)
  const [purchasedItems, setPurchasedItems] = useState<string[]>([])

  useEffect(() => {
    loadBalance()
    loadPurchasedItems()
  }, [])

  const loadBalance = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      setBalance(data.tokensEarned || 0)
    }
  }

  const loadPurchasedItems = () => {
    const stored = localStorage.getItem('daty_purchased_items')
    if (stored) {
      setPurchasedItems(JSON.parse(stored))
    }
  }

  const handlePurchase = (item: MarketplaceItem) => {
    if (balance < item.price) {
      alert('Not enough DATY tokens!')
      return
    }

    if (window.confirm(`Purchase ${item.name} for ${item.price} DATY?`)) {
      // Deduct tokens
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        data.tokensEarned = (data.tokensEarned || 0) - item.price
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        setBalance(data.tokensEarned)
      }

      // Add to purchased items
      const newPurchased = [...purchasedItems, item.id]
      setPurchasedItems(newPurchased)
      localStorage.setItem('daty_purchased_items', JSON.stringify(newPurchased))

      alert(`Successfully purchased ${item.name}!`)
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'boost':
        return 'Boosts'
      case 'feature':
        return 'Features'
      case 'cosmetic':
        return 'Cosmetics'
      default:
        return ''
    }
  }

  const categories = ['boost', 'feature', 'cosmetic'] as const

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
        {/* Balance Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '24px',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '1rem',
            opacity: 0.9,
            marginBottom: '8px',
          }}>
            Your Balance
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}>
            {balance.toLocaleString()}
          </div>
          <div style={{
            fontSize: '1.2rem',
            opacity: 0.9,
          }}>
            💎 DATY
          </div>
        </div>

        {/* Marketplace Items */}
        {categories.map(category => {
          const items = MARKETPLACE_ITEMS.filter(item => item.category === category)
          return (
            <div key={category} style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.3rem',
                margin: '0 0 16px 0',
                fontWeight: 'bold',
                color: 'white',
              }}>
                {getCategoryTitle(category)}
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {items.map(item => {
                  const isPurchased = purchasedItems.includes(item.id)
                  const canAfford = balance >= item.price

                  return (
                    <div
                      key={item.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '16px',
                        padding: '20px',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        opacity: isPurchased ? 0.6 : 1,
                      }}
                    >
                      <div style={{
                        fontSize: '3rem',
                        minWidth: '60px',
                        textAlign: 'center',
                      }}>
                        {item.icon}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          marginBottom: '4px',
                        }}>
                          {item.name}
                          {isPurchased && (
                            <span style={{
                              marginLeft: '8px',
                              fontSize: '0.8rem',
                              background: '#51cf66',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '6px',
                            }}>
                              Owned
                            </span>
                          )}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666',
                          marginBottom: '8px',
                        }}>
                          {item.description}
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#667eea',
                        }}>
                          💎 {item.price} DATY
                        </div>
                      </div>

                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={isPurchased || !canAfford}
                        style={{
                          padding: '12px 24px',
                          background: isPurchased
                            ? '#ccc'
                            : canAfford
                            ? '#667eea'
                            : '#e9ecef',
                          border: 'none',
                          borderRadius: '12px',
                          color: isPurchased || !canAfford ? '#999' : 'white',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: isPurchased || !canAfford ? 'not-allowed' : 'pointer',
                          minWidth: '80px',
                        }}
                      >
                        {isPurchased ? 'Owned' : canAfford ? 'Buy' : 'Locked'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
