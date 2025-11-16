import { useState, useEffect } from 'react'

interface CheckInData {
  lastCheckIn: string | null
  streak: number
  totalCheckIns: number
  tokensEarned: number
  weeklyCheckIns: string[] // ISO date strings for this week
}

export interface WeekDay {
  dayName: string
  dayNumber: number
  isCheckedIn: boolean
  isToday: boolean
  isFuture: boolean
}

const STORAGE_KEY = 'daty_checkin_data'
const BASE_REWARD = 10
const STREAK_BONUS_MULTIPLIER = 2

export const useCheckIn = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [checkInReward, setCheckInReward] = useState(0)
  const [streak, setStreak] = useState(0)
  const [canClaimToday, setCanClaimToday] = useState(false)
  const [weekDays, setWeekDays] = useState<WeekDay[]>([])

  useEffect(() => {
    initCheckIn()
  }, [])

  const getCheckInData = (): CheckInData => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return {
        lastCheckIn: null,
        streak: 0,
        totalCheckIns: 0,
        tokensEarned: 0,
        weeklyCheckIns: [],
      }
    }
    return JSON.parse(stored)
  }

  const saveCheckInData = (data: CheckInData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isYesterday = (dateString: string | null): boolean => {
    if (!dateString) return false
    const date = new Date(dateString)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return isSameDay(date, yesterday)
  }

  const getWeekDays = (): WeekDay[] => {
    const today = new Date()
    const data = getCheckInData()
    const checkedInDates = new Set(data.weeklyCheckIns)

    // Get current week (Sunday to Saturday)
    const currentDay = today.getDay() // 0 = Sunday, 6 = Saturday
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - currentDay)
    weekStart.setHours(0, 0, 0, 0)

    const days: WeekDay[] = []
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      const dateString = date.toISOString().split('T')[0]

      days.push({
        dayName: dayNames[i],
        dayNumber: date.getDate(),
        isCheckedIn: checkedInDates.has(dateString),
        isToday: isSameDay(date, today),
        isFuture: date > today,
      })
    }

    return days
  }

  const calculateReward = (currentStreak: number): number => {
    const streakBonus = Math.floor(currentStreak / 7) * STREAK_BONUS_MULTIPLIER
    return BASE_REWARD + streakBonus
  }

  const initCheckIn = () => {
    const data = getCheckInData()
    const days = getWeekDays()
    setWeekDays(days)

    const today = new Date().toISOString().split('T')[0]
    const alreadyCheckedIn = data.weeklyCheckIns.includes(today)

    if (alreadyCheckedIn) {
      setStreak(data.streak)
      setCanClaimToday(false)
    } else {
      // Calculate potential reward
      let newStreak = 1
      if (data.lastCheckIn && isYesterday(data.lastCheckIn)) {
        newStreak = data.streak + 1
      }
      setStreak(newStreak)
      setCheckInReward(calculateReward(newStreak))
      setCanClaimToday(true)
      setShowCheckInModal(true)
    }
  }

  const claimCheckIn = () => {
    const data = getCheckInData()
    const today = new Date().toISOString().split('T')[0]

    // Calculate new streak
    let newStreak = 1
    if (data.lastCheckIn && isYesterday(data.lastCheckIn)) {
      newStreak = data.streak + 1
    }

    const reward = calculateReward(newStreak)

    // Update weekly check-ins (keep only this week's check-ins)
    const weeklyCheckIns = [...data.weeklyCheckIns, today]

    const newData: CheckInData = {
      lastCheckIn: new Date().toISOString(),
      streak: newStreak,
      totalCheckIns: data.totalCheckIns + 1,
      tokensEarned: data.tokensEarned + reward,
      weeklyCheckIns,
    }

    saveCheckInData(newData)
    setStreak(newStreak)
    setCheckInReward(reward)
    setCanClaimToday(false)
    setWeekDays(getWeekDays())
  }

  const closeModal = () => {
    setShowCheckInModal(false)
  }

  const openCheckInModal = () => {
    setShowCheckInModal(true)
  }

  return {
    showCheckInModal,
    checkInReward,
    streak,
    canClaimToday,
    weekDays,
    claimCheckIn,
    closeModal,
    openCheckInModal,
    totalTokensEarned: getCheckInData().tokensEarned,
    totalCheckIns: getCheckInData().totalCheckIns,
  }
}
