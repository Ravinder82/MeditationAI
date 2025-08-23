/**
 * Meditation Theme Utilities
 * Beautiful color combinations and helpers for the MeditationAI app
 */

import Colors from './Colors';

const meditationColors = Colors.meditation;

// Morning meditation theme combinations
export const morningTheme = {
  // Primary gradient: Vibrant awakening → Soft golden light
  primaryGradient: [
    meditationColors.sunrise.coral,  // Vibrant awakening energy
    meditationColors.sunrise.golden  // Soft golden sunlight
  ],
  
  // Secondary gradient: Golden light → Calm breeze
  secondaryGradient: [
    meditationColors.sunrise.golden,  // Soft golden sunlight
    meditationColors.sunrise.skyBlue  // Calm morning breeze
  ],
  
  // Full spectrum: Complete morning journey
  fullSpectrum: [
    meditationColors.sunrise.coral,     // Vibrant awakening energy
    meditationColors.sunrise.golden,   // Soft golden sunlight
    meditationColors.sunrise.skyBlue   // Calm morning breeze
  ],
  
  // Accent colors for morning
  accent: meditationColors.accent.sage,        // Healing green
  highlight: meditationColors.sunrise.lightPeach, // Gentle warmth
  
  // Text colors
  primaryText: meditationColors.sunrise.coral,
  secondaryText: meditationColors.neutral.charcoal + 'B3',
} as const;

// Evening meditation theme combinations  
export const eveningTheme = {
  // Primary gradient: Mystical twilight → Evening calm
  primaryGradient: [
    meditationColors.sunset.deepPurple,   // Mystical twilight
    meditationColors.sunset.twilightBlue  // Evening calm
  ],
  
  // Secondary gradient: Evening calm → Romantic dusk
  secondaryGradient: [
    meditationColors.sunset.twilightBlue, // Evening calm
    meditationColors.sunset.warmCoral     // Romantic dusk
  ],
  
  // Full spectrum: Complete evening journey
  fullSpectrum: [
    meditationColors.sunset.deepPurple,   // Mystical twilight
    meditationColors.sunset.twilightBlue, // Evening calm
    meditationColors.sunset.warmCoral     // Romantic dusk
  ],
  
  // Accent colors for evening
  accent: meditationColors.accent.mintGreen,    // Refreshing vitality
  highlight: meditationColors.sunset.lavender, // Soft serenity
  
  // Text colors
  primaryText: meditationColors.sunset.deepPurple,
  secondaryText: meditationColors.neutral.warmWhite + 'B3',
} as const;

// Neutral meditation theme (for anytime use)
export const neutralTheme = {
  // Calming gradient: Sage → Mint green
  primaryGradient: [
    meditationColors.accent.sage,      // Healing green
    meditationColors.accent.mintGreen  // Refreshing vitality
  ],
  
  // Warm gradient: Soft orange → Pale yellow
  secondaryGradient: [
    meditationColors.accent.softOrange, // Comforting glow
    meditationColors.accent.paleYellow  // Gentle optimism
  ],
  
  // Base colors
  background: meditationColors.neutral.softGray,
  surface: meditationColors.neutral.warmWhite,
  text: meditationColors.neutral.charcoal,
} as const;

// Helper functions for dynamic theming
export const getTimeBasedTheme = (hour?: number) => {
  const currentHour = hour ?? new Date().getHours();
  
  if (currentHour >= 6 && currentHour < 12) {
    return { type: 'morning', theme: morningTheme };
  } else if (currentHour >= 18 || currentHour < 6) {
    return { type: 'evening', theme: eveningTheme };
  } else {
    return { type: 'neutral', theme: neutralTheme };
  }
};

// Breathing animation color helpers
export const getBreathingColors = (mode: 'morning' | 'evening' | 'neutral') => {
  switch (mode) {
    case 'morning':
      return {
        base: meditationColors.sunrise.coral + '30',     // Vibrant awakening with transparency
        border: meditationColors.sunrise.coral,         // Pure vibrant awakening
        text: meditationColors.sunrise.coral
      };
    case 'evening':
      return {
        base: meditationColors.sunset.deepPurple + '30', // Mystical twilight with transparency
        border: meditationColors.sunset.deepPurple,     // Pure mystical twilight
        text: meditationColors.sunset.deepPurple
      };
    default:
      return {
        base: meditationColors.accent.sage + '30',       // Healing green with transparency
        border: meditationColors.accent.sage,           // Pure healing green
        text: meditationColors.accent.sage
      };
  }
};

// Progress indicator colors
export const getProgressColors = (mode: 'morning' | 'evening' | 'neutral') => {
  switch (mode) {
    case 'morning':
      return {
        track: meditationColors.sunrise.golden + '30',   // Soft golden sunlight track
        progress: meditationColors.sunrise.skyBlue       // Calm morning breeze progress
      };
    case 'evening':
      return {
        track: meditationColors.sunset.lavender + '30',  // Soft serenity track
        progress: meditationColors.sunset.warmCoral      // Romantic dusk progress
      };
    default:
      return {
        track: meditationColors.neutral.lightGray,       // Light gray track
        progress: meditationColors.accent.sage           // Healing green progress
      };
  }
};

// Export the complete meditation colors for direct access
export { meditationColors };
export default {
  morning: morningTheme,
  evening: eveningTheme,
  neutral: neutralTheme,
  getTimeBasedTheme,
  getBreathingColors,
  getProgressColors,
  colors: meditationColors
};