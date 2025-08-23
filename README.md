# 🧘‍♀️ MeditationAI

A beautiful, cross-platform meditation app built with React Native and Expo, featuring time-aware themes and guided breathing sessions.

## ✨ Features

### 🌅 Morning Energy & 🌙 Evening Calm
- **Time-aware themes** with beautiful gradient backgrounds
- **Morning mode**: Coral → Golden → Mint gradients for energizing sessions
- **Evening mode**: Deep Purple → Twilight Blue → Warm Coral for calming experiences

### 🎯 Complete Meditation Experience
- **Duration selection**: Choose from 5, 10, 15, or 20-minute sessions
- **Animated breathing circle**: 4-second inhale/exhale cycles with smooth scaling
- **Real-time progress**: Visual progress ring and countdown timer
- **Session controls**: Pause, resume, and stop with confirmation
- **Completion celebration**: Motivational messages and session summary

### 🎨 Design System
- **Reusable design tokens** for consistent styling
- **8px grid spacing system** for perfect alignment
- **Comprehensive typography scale** with semantic sizing
- **Shadow presets** for depth and elevation
- **Responsive layouts** for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Studio (for native testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ravinder82/MeditationAI.git
   cd MeditationAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 📱 How to Use

1. **Launch the app** and you'll see the beautiful home screen with a breathing animation
2. **Choose your session** by tapping either:
   - 🌅 **Morning Energy** - Perfect for starting your day with intention
   - 🌙 **Evening Calm** - Ideal for unwinding after a long day
3. **Select duration** from the rounded chip options (5, 10, 15, or 20 minutes)
4. **Tap "Begin Meditation"** to start your session
5. **Follow the breathing circle** as it guides your inhale and exhale cycles
6. **Monitor progress** with the visual progress ring and timer
7. **Complete your session** and enjoy the celebration screen

## 🏗️ Project Structure

```
MeditationAI/
├── app/                          # Screen components
│   ├── index.tsx                 # Home screen with navigation cards
│   ├── session.tsx               # Complete meditation experience
│   └── _layout.tsx               # Root layout and navigation
├── constants/                    # Design system and themes
│   ├── Colors.ts                 # Meditation-inspired color palette
│   └── DesignTokens.ts          # Reusable spacing, typography, shadows
├── components/                   # Reusable UI components
│   ├── Themed.tsx               # Theme-aware components
│   └── ...                      # Other utility components
└── docs/                        # Documentation and specifications
```

## 🎨 Color Palette

### Morning Gradients
- **Coral**: `#FF6B6B` - Vibrant awakening energy
- **Golden**: `#FFE66D` - Soft golden sunlight  
- **Mint Green**: `#9AE6B4` - Refreshing vitality

### Evening Gradients
- **Deep Purple**: `#6C5CE7` - Mystical twilight
- **Twilight Blue**: `#74B9FF` - Evening calm
- **Warm Coral**: `#FD79A8` - Romantic dusk

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo SDK 53
- **Language**: TypeScript for type safety
- **Navigation**: Expo Router with file-based routing
- **Animations**: React Native Animated API
- **Styling**: StyleSheet with design tokens
- **Gradients**: expo-linear-gradient
- **Platforms**: iOS, Android, Web

## 📐 Design Tokens

The app uses a comprehensive design system with reusable tokens:

- **Spacing**: 8px grid system (4, 8, 16, 24, 32, 48, 64px)
- **Border Radius**: 4, 8, 12, 16, 20, 25, 50px scales
- **Typography**: 12-64px font sizes with semantic weights
- **Shadows**: Small, medium, large presets for elevation
- **Session-specific**: 260px breathing circle, optimized touch targets

## 🎯 Key Features

### State Management
- **Local state** for session management
- **Smooth animations** with React Native Animated
- **Progress tracking** with real-time updates
- **Persistent session settings** during app lifecycle

### User Experience
- **Intuitive navigation** with visual feedback
- **Responsive design** for all screen sizes
- **Accessibility support** through semantic components
- **Performance optimized** animations and renders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo team** for the amazing development platform
- **React Native community** for comprehensive documentation
- **Design inspiration** from leading meditation apps
- **Color palette** inspired by natural light cycles

---

**Built with ❤️ for mindfulness and mental wellness**

*Start your meditation journey today with beautiful, guided breathing sessions.*