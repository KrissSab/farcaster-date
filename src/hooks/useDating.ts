import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

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
  const [allProfiles] = useState<Profile[]>(MOCK_PROFILES)
  const [matches, setMatches] = useState<Profile[]>([])
  const [passed, setPassed] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Load saved data on mount
  useEffect(() => {
    const savedLikes = storage.getLikedProfiles()
    const savedPassed = storage.getPassedProfiles()

    setMatches(savedLikes)
    setPassed(savedPassed)
  }, [])

  // Filter out profiles that have been liked or passed
  const availableProfiles = allProfiles.filter(profile => {
    const isLiked = matches.some(m => m.fid === profile.fid)
    const isPassed = passed.includes(profile.fid)
    return !isLiked && !isPassed
  })

  const currentProfile = availableProfiles[currentIndex] || null

  const handleLike = () => {
    if (!currentProfile) return

    // Add to matches and save to localStorage
    const newMatches = [...matches, currentProfile]
    setMatches(newMatches)
    storage.addLikedProfile(currentProfile)

    // Move to next profile
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePass = () => {
    if (!currentProfile) return

    // Add to passed list and save to localStorage
    const newPassed = [...passed, currentProfile.fid]
    setPassed(newPassed)
    storage.addPassedProfile(currentProfile.fid)

    // Move to next profile
    setCurrentIndex((prev) => prev + 1)
  }

  const handleRemoveMatch = (fid: number) => {
    const filtered = matches.filter(p => p.fid !== fid)
    setMatches(filtered)
    storage.removeLikedProfile(fid)
  }

  const hasMoreProfiles = currentIndex < availableProfiles.length

  return {
    currentProfile,
    hasMoreProfiles,
    matches,
    matchCount: matches.length,
    handleLike,
    handlePass,
    handleRemoveMatch,
  }
}
