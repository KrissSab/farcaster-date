# Daty - Dating App Demo Guide

## Overview

Daty is a Farcaster-native dating mini-app with gamification features, daily check-ins, and a token economy.

## Features Overview

### 1. **Dating/Discover** 💝
- Swipe through 15 mock user profiles
- Swipe right (like) or left (pass)
- Touch gestures on mobile
- Mouse drag on desktop
- Visual indicators (LIKE/NOPE) during swipe

### 2. **Matches** 💚
- View all your matches
- See matched users with profile pictures
- Remove matches if needed
- Real-time match counter in menu

### 3. **Daily Check-In** 🔥
- Automatic popup on first daily visit
- Weekly calendar view (4 days top, 3 days bottom)
- Visual indicators:
  - ✓ Green for checked-in days
  - ✗ Red for missed days
  - ○ Gray for future days
  - White border for today
- Streak tracking with bonuses
- Token rewards:
  - Base: 10 DATY tokens/day
  - Bonus: +2 tokens per 7-day streak
- Accessible from menu anytime

### 4. **Marketplace** 🛒

#### Buy Tokens Tab:
- **Crypto Packages** (Mock - Base Sepolia ready):
  - Starter: 100 DATY for 0.001 ETH
  - Popular: 550 DATY for 0.005 ETH (50 bonus)
  - Best Value: 1200 DATY for 0.008 ETH (200 bonus)
  - Premium: 3250 DATY for 0.015 ETH (750 bonus)

- **Fiat Packages** (Mock):
  - Starter: 100 DATY for $0.99
  - Popular: 550 DATY for $4.99 (50 bonus)
  - Best Value: 1200 DATY for $8.99 (200 bonus)
  - Premium: 3250 DATY for $19.99 (750 bonus)

#### Spend Tokens Tab:
- **Boosts:**
  - 24h Profile Boost (50 DATY)

- **Features:**
  - 3 Super Likes (30 DATY)
  - 7 Days Unlimited Swipes (100 DATY)
  - 5 Undo Swipes (25 DATY)

- **Cosmetics:**
  - Verified Badge (200 DATY)
  - Gold Theme (150 DATY)

### 5. **Profile** 👤
- User info (from Farcaster)
- Random DATY token balance display
- Stats: Profile views, Likes sent
- Clean, card-based UI

### 6. **Settings** ⚙️
- Notification toggle (mock)
- Online status toggle (mock)
- Distance preferences
- **Danger Zone:**
  - Clear all data button
  - Resets everything to fresh state

## Demo Flow

### Opening Experience
1. App loads with purple gradient background
2. Shows "Loading Daty..." briefly
3. Auto-shows daily check-in modal if first visit today
4. Lands on Discover page with first profile

### Demo Script

#### Part 1: Dating Feature (30 seconds)
1. "Here's Daty, a dating app for Farcaster"
2. Swipe right to like a profile → See LIKE indicator
3. Swipe left to pass → See NOPE indicator
4. "Works with touch on mobile, drag on desktop"
5. Swipe through 2-3 more profiles

#### Part 2: Check-In & Tokens (30 seconds)
1. Open menu (burger icon top-right)
2. Click "Daily Streak" button
3. "This is the daily check-in system"
4. Show weekly calendar:
   - "Green checkmark = checked in"
   - "Today has white border"
   - "Future days are grayed out"
5. Click "Claim Reward" → Get 10 DATY tokens
6. "Streak bonuses encourage daily engagement"

#### Part 3: Marketplace (45 seconds)
1. Click "Marketplace" in menu
2. "Users can buy tokens with crypto or fiat"
3. Show crypto packages:
   - "Ready for Base Sepolia integration"
   - "Bonus tokens on larger packages"
4. Click "Spend Tokens" tab
5. "Spend tokens on boosts, features, cosmetics"
6. Try buying a cheap item (3 Super Likes - 30 DATY)
7. Show balance update in real-time

#### Part 4: Matches (15 seconds)
1. Click "Matches" in menu
2. "All liked profiles appear here"
3. Show match count badge
4. "Can remove matches anytime"

#### Part 5: Profile & Settings (15 seconds)
1. Click "Profile"
2. Show token balance, stats
3. Click "Settings"
4. "Clear all data for testing" (don't click)

### Key Demo Points

✅ **Farcaster-Native:**
- Uses Farcaster SDK for auth
- Works as mini-app in Farcaster
- Dev mode for localhost testing

✅ **Engagement Features:**
- Daily check-ins with streaks
- Token rewards
- Visual weekly calendar

✅ **Token Economy:**
- Earn: Daily check-ins
- Buy: Crypto (Base Sepolia) or Fiat
- Spend: Premium features

✅ **Modern UX:**
- Swipe gestures
- Smooth animations
- Mobile-first design
- Purple gradient theme

✅ **Ready for Web3:**
- Smart contract prepared
- Base Sepolia integration
- Farcaster transaction API

## Testing Checklist

- [ ] Open app on localhost:5173
- [ ] Check-in modal appears
- [ ] Claim daily reward
- [ ] Swipe through profiles (both directions)
- [ ] View matches
- [ ] Buy tokens (both crypto and fiat mock)
- [ ] Purchase marketplace item
- [ ] Check balance updates
- [ ] Test all menu navigation
- [ ] Clear data and restart

## Mock Data Summary

- **15 Dating Profiles** - Diverse, realistic mock users
- **Token System** - Full economy with localStorage
- **Check-ins** - Week-based tracking
- **Purchases** - Saved to localStorage

## Deployment Ready

### Current State:
✅ All features working offline
✅ Mock data for demo
✅ Smart contract ready for deployment
✅ Farcaster SDK integrated
✅ Base Sepolia configuration ready

### To Deploy to Production:
1. Build: `npm run build`
2. Deploy to Vercel/Netlify
3. Configure Farcaster manifest
4. (Optional) Deploy smart contract to Base Sepolia

### When Smart Contract is Deployed:
1. Update `src/contracts/DatyToken.ts` with address
2. Rebuild and redeploy
3. Real crypto purchases will work in Farcaster

## Technical Stack

- **React** + **TypeScript**
- **Vite** - Build tool
- **Farcaster Frame SDK** - Auth & Transactions
- **Viem** - Ethereum utilities
- **Wagmi** - Wallet connection (ready)
- **Solidity** - Smart contract
- **Base Sepolia** - Testnet (ready)

## Demo Environment

**Development:**
- URL: http://localhost:5173
- Mode: Mock authentication
- Transactions: All simulated
- Data: localStorage only

**Production (after deploy):**
- Farcaster mini-app
- Real authentication
- Real transactions (when contract deployed)
- Persistent data

## Quick Reset

To reset all data for fresh demo:
1. Settings → Clear All Data
2. Or clear browser localStorage manually
3. Page will reload with fresh state

---

**Ready to demo!** 🚀

All features work offline with mock data. The app is production-ready and can be deployed anytime. Smart contract integration is prepared and can be enabled by deploying the contract and updating one configuration file.
