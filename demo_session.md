# Complete Session & Meditation Screen

## Integrated Meditation Experience

### Navigation Flow:
1. **Home Screen (`/`)** → Tap "Morning Energy" or "Evening Calm"
2. **Session Screen (`/session`)** → Complete meditation experience in one screen
   - Session configuration (duration selection)
   - Active meditation with breathing animation
   - Timer and progress tracking
   - Session completion celebration

### Session Screen Features:

#### 🎨 **Design Elements:**
- **Full-screen gradient**: Coral → Sunny Yellow → Mint for Morning Energy
- **Soft blur overlay** near the header for depth
- **260px breathing circle** with animated scaling during meditation
- **Duration chips** (5m, 10m, 15m, 20m) with rounded outline style
- **Dynamic controls** that change based on session state
- **Progress ring** showing meditation progress
- **Completion celebration** with motivational messages

#### 🔄 **Session States:**
1. **Ready State**: Duration selection + "Begin Meditation" button
2. **Active State**: Animated breathing circle + timer + pause/stop controls
3. **Paused State**: Static circle + "Resume" button
4. **Completed State**: Celebration screen + "Return Home" / "Meditate Again"

#### 🏗️ **Reusable Design Tokens:**
- **Spacing**: 8px grid system (xs=4, sm=8, md=16, lg=24, xl=32...)
- **Radii**: xs=4, sm=8, md=12, lg=16, xl=20, xxl=25, round=50
- **Typography**: Consistent font sizes and weights
- **Shadows**: Small, medium, large shadow presets
- **Session-specific**: 260px circle, chip padding, gradient definitions

#### 🎯 **User Experience:**
1. User selects Morning Energy or Evening Calm from home
2. Session screen opens with appropriate theme and description
3. User selects duration (5, 10, 15, or 20 minutes)
4. User taps "Begin Meditation" to start session
5. Breathing circle animates with 4-second inhale/exhale cycles
6. Progress ring fills as time counts down
7. User can pause/resume or stop early with confirmation
8. Completion screen celebrates achievement
9. Options to return home or start another session

### To Test:
```bash
# Start the development server
npm start

# Then navigate to:
# - Home screen: /
# - Session screen: /session?mode=morning
# - Session screen: /session?mode=evening
```

### Files Created/Modified:
- ✅ `/constants/DesignTokens.ts` - Reusable design system
- ✅ `/app/session.tsx` - Complete session & meditation experience
- ✅ `/app/index.tsx` - Updated navigation to session screen
- ❌ `/app/meditation.tsx` - Removed (functionality integrated into session.tsx)

The session screen now provides a complete meditation experience from configuration through completion, all in one beautifully designed interface with consistent design tokens for future development.