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
  {
    fid: 6,
    username: 'fiona',
    displayName: 'Fiona',
    bio: 'Book lover and writer. Let\'s share our favorite stories over coffee.',
  },
  {
    fid: 7,
    username: 'george',
    displayName: 'George',
    bio: 'Crypto enthusiast and NFT collector. Building the future of web3.',
  },
  {
    fid: 8,
    username: 'hannah',
    displayName: 'Hannah',
    bio: 'Yoga instructor and nature lover. Peace, love, and good vibes only ✌️',
  },
  {
    fid: 9,
    username: 'isaac',
    displayName: 'Isaac',
    bio: 'Gaming streamer and esports fan. Looking for a co-op partner in life!',
  },
  {
    fid: 10,
    username: 'julia',
    displayName: 'Julia',
    bio: 'Marketing strategist and content creator. Let\'s create something amazing together.',
  },
  {
    fid: 11,
    username: 'kevin',
    displayName: 'Kevin',
    bio: 'Outdoor adventurer and hiking enthusiast. Let\'s hit the trails!',
  },
  {
    fid: 12,
    username: 'luna',
    displayName: 'Luna',
    bio: 'Astronomer and science geek. Want to stargaze with me? 🌟',
  },
  {
    fid: 13,
    username: 'marco',
    displayName: 'Marco',
    bio: 'Professional dancer and music lover. Life is better when you dance!',
  },
  {
    fid: 14,
    username: 'nina',
    displayName: 'Nina',
    bio: 'Fashion designer and sustainable living advocate. Making the world beautiful.',
  },
  {
    fid: 15,
    username: 'oliver',
    displayName: 'Oliver',
    bio: 'Entrepreneur and startup founder. Looking for my co-founder in life and love.',
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
