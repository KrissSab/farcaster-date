import { useState, useEffect } from 'react'

interface CheckInData {
  lastCheckIn: string | null
  streak: number
  totalCheckIns: number
  tokensEarned: number
}

const STORAGE_KEY = 'daty_checkin_data'
const BASE_REWARD = 10
const STREAK_BONUS_MULTIPLIER = 2

export const useCheckIn = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [checkInReward, setCheckInReward] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isNewCheckIn, setIsNewCheckIn] = useState(false)

  useEffect(() => {
    checkDailyCheckIn()
  }, [])

  const getCheckInData = (): CheckInData => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return {
        lastCheckIn: null,
        streak: 0,
        totalCheckIns: 0,
        tokensEarned: 0,
      }
    }
    return JSON.parse(stored)
  }

  const saveCheckInData = (data: CheckInData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const isToday = (dateString: string | null): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isYesterday = (dateString: string | null): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    )
  }

  const calculateReward = (currentStreak: number): number => {
    // Base reward + bonus for streak
    const streakBonus = Math.floor(currentStreak / 7) * STREAK_BONUS_MULTIPLIER
    return BASE_REWARD + streakBonus
  }

  const checkDailyCheckIn = () => {
    const data = getCheckInData()

    // Already checked in today
    if (isToday(data.lastCheckIn)) {
      setStreak(data.streak)
      return
    }

    // New check-in!
    let newStreak = 1

    // Continue streak if checked in yesterday
    if (isYesterday(data.lastCheckIn)) {
      newStreak = data.streak + 1
    }

    const reward = calculateReward(newStreak)

    const newData: CheckInData = {
      lastCheckIn: new Date().toISOString(),
      streak: newStreak,
      totalCheckIns: data.totalCheckIns + 1,
      tokensEarned: data.tokensEarned + reward,
    }

    saveCheckInData(newData)
    setStreak(newStreak)
    setCheckInReward(reward)
    setIsNewCheckIn(true)
    setShowCheckInModal(true)
  }

  const closeModal = () => {
    setShowCheckInModal(false)
  }

  return {
    showCheckInModal,
    checkInReward,
    streak,
    isNewCheckIn,
    closeModal,
    totalTokensEarned: getCheckInData().tokensEarned,
    totalCheckIns: getCheckInData().totalCheckIns,
  }
}
