interface Profile {
  fid: number
  username: string
  displayName: string
  pfpUrl?: string
  bio?: string
}

const STORAGE_KEYS = {
  LIKED_PROFILES: 'daty_liked_profiles',
  PASSED_PROFILES: 'daty_passed_profiles',
}

export const storage = {
  // Get liked profiles
  getLikedProfiles: (): Profile[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LIKED_PROFILES)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to get liked profiles:', error)
      return []
    }
  },

  // Save liked profiles
  saveLikedProfiles: (profiles: Profile[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LIKED_PROFILES, JSON.stringify(profiles))
    } catch (error) {
      console.error('Failed to save liked profiles:', error)
    }
  },

  // Add a liked profile
  addLikedProfile: (profile: Profile): void => {
    const profiles = storage.getLikedProfiles()
    // Avoid duplicates
    if (!profiles.find(p => p.fid === profile.fid)) {
      profiles.push(profile)
      storage.saveLikedProfiles(profiles)
    }
  },

  // Remove a liked profile
  removeLikedProfile: (fid: number): void => {
    const profiles = storage.getLikedProfiles()
    const filtered = profiles.filter(p => p.fid !== fid)
    storage.saveLikedProfiles(filtered)
  },

  // Get passed profiles
  getPassedProfiles: (): number[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PASSED_PROFILES)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to get passed profiles:', error)
      return []
    }
  },

  // Save passed profiles
  savePassedProfiles: (fids: number[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PASSED_PROFILES, JSON.stringify(fids))
    } catch (error) {
      console.error('Failed to save passed profiles:', error)
    }
  },

  // Add a passed profile
  addPassedProfile: (fid: number): void => {
    const passed = storage.getPassedProfiles()
    if (!passed.includes(fid)) {
      passed.push(fid)
      storage.savePassedProfiles(passed)
    }
  },

  // Clear all data
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.LIKED_PROFILES)
    localStorage.removeItem(STORAGE_KEYS.PASSED_PROFILES)
  },
}
