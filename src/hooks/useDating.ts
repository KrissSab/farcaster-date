import { useState } from 'react'

interface Profile {
  fid: number
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
}

// Mock profiles for demo - in production, fetch from Farcaster API
const MOCK_PROFILES: Profile[] = [
  {
    fid: 1,
    username: 'alice',
    displayName: 'Alice',
    bio: 'Love traveling and photography. Looking for someone to explore the world with!',
  },
  {
    fid: 2,
    username: 'bob',
    displayName: 'Bob',
    bio: 'Tech enthusiast and coffee lover. Let\'s build something together!',
  },
  {
    fid: 3,
    username: 'charlie',
    displayName: 'Charlie',
    bio: 'Artist and musician. Creating is my passion. What\'s yours?',
  },
  {
    fid: 4,
    username: 'diana',
    displayName: 'Diana',
    bio: 'Fitness and wellness advocate. Let\'s stay healthy together!',
  },
  {
    fid: 5,
    username: 'evan',
    displayName: 'Evan',
    bio: 'Foodie and chef. I cook, you eat? 👨‍🍳',
  },
]

export const useDating = () => {
  const [profiles] = useState<Profile[]>(MOCK_PROFILES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<Profile[]>([])
  const [, setPassed] = useState<number[]>([])

  const currentProfile = profiles[currentIndex] || null

  const handleLike = () => {
    if (!currentProfile) return

    // Add to matches
    setMatches((prev) => [...prev, currentProfile])

    // Move to next profile
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePass = () => {
    if (!currentProfile) return

    // Add to passed list
    setPassed((prev) => [...prev, currentProfile.fid])

    // Move to next profile
    setCurrentIndex((prev) => prev + 1)
  }

  const hasMoreProfiles = currentIndex < profiles.length

  return {
    currentProfile,
    hasMoreProfiles,
    matches,
    matchCount: matches.length,
    handleLike,
    handlePass,
  }
}
