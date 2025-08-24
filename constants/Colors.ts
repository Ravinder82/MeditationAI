// World's most beautiful meditation-inspired color palette
const meditationColors = {
  // Morning gradient colors
  sunrise: {
    coral: '#FF6B6B',       // Vibrant awakening energy
    golden: '#FFE66D',      // Soft golden sunlight
    skyBlue: '#4ECDC4',     // Calm morning breeze
    lightPeach: '#FFAAA5',  // Gentle warmth
  },
  // Evening gradient colors
  sunset: {
    deepPurple: '#6C5CE7',  // Mystical twilight
    twilightBlue: '#74B9FF',// Evening calm
    warmCoral: '#FD79A8',   // Romantic dusk
    lavender: '#DDD6FE',    // Soft serenity
  },
  // Base neutrals for balance
  neutral: {
    warmWhite: '#FEFEFE',
    softGray: '#F7FAFC',
    charcoal: '#2D3748',
    lightGray: '#E2E8F0',
  },
  // Color psychology for meditation with scientific backing
  psychology: {
    // Based on color psychology research for emotional regulation
    stressReduction: '#74B9FF', // Blue proven to reduce cortisol
    focusEnhancement: '#55A3FF', // Blue enhances cognitive performance
    emotionalBalance: '#00B894', // Green creates emotional equilibrium
    sleepPreparation: '#6C5CE7', // Purple promotes melatonin
    breathing: '#A29BFE', // Lavender for GABA enhancement
    mindfulness: '#FD79A8', // Pink for oxytocin release
  },
  // Accent highlights with emotional triggers
  accent: {
    sage: '#68D391',        // Healing green (biophilic response)
    softOrange: '#FBB6CE',  // Comforting glow (warmth response)
    mintGreen: '#9AE6B4',   // Refreshing vitality (energy renewal)
    paleYellow: '#FEFCBF',  // Gentle optimism (serotonin trigger)
  },
};

const tintColorLight = meditationColors.sunrise.skyBlue;
const tintColorDark = meditationColors.sunset.lavender;

export default {
  light: {
    text: meditationColors.neutral.charcoal,
    background: meditationColors.neutral.warmWhite,
    tint: tintColorLight,
    tabIconDefault: meditationColors.neutral.lightGray,
    tabIconSelected: tintColorLight,
    cardBackground: meditationColors.neutral.softGray,
    accent: meditationColors.accent.sage,
    // Morning theme colors
    morningPrimary: meditationColors.sunrise.coral,
    morningSecondary: meditationColors.sunrise.golden,
    morningTertiary: meditationColors.sunrise.skyBlue,
    // Evening theme colors  
    eveningPrimary: meditationColors.sunset.deepPurple,
    eveningSecondary: meditationColors.sunset.twilightBlue,
    eveningTertiary: meditationColors.sunset.warmCoral,
  },
  dark: {
    text: meditationColors.neutral.warmWhite,
    background: meditationColors.neutral.charcoal,
    tint: tintColorDark,
    tabIconDefault: meditationColors.neutral.lightGray,
    tabIconSelected: tintColorDark,
    cardBackground: '#4A5568',
    accent: meditationColors.accent.mintGreen,
    // Morning theme colors
    morningPrimary: meditationColors.sunrise.lightPeach,
    morningSecondary: meditationColors.sunrise.golden,
    morningTertiary: meditationColors.sunrise.skyBlue,
    // Evening theme colors
    eveningPrimary: meditationColors.sunset.lavender,
    eveningSecondary: meditationColors.sunset.twilightBlue,
    eveningTertiary: meditationColors.sunset.warmCoral,
  },
  meditation: meditationColors,
};
