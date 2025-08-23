// Design Tokens for MeditationAI App
// Reusable design constants for consistent UI implementation

export const spacing = {
  // Base spacing scale (8px grid system)
  xs: 4,     // 4px
  sm: 8,     // 8px 
  md: 16,    // 16px
  lg: 24,    // 24px
  xl: 32,    // 32px
  xxl: 48,   // 48px
  xxxl: 64,  // 64px
  
  // Semantic spacing
  screenPadding: 24,
  headerPadding: 20,
  componentGap: 16,
  sectionGap: 40,
  buttonPadding: 16,
} as const;

export const radii = {
  // Border radius scale
  none: 0,
  xs: 4,     // Small elements
  sm: 8,     // Cards, inputs
  md: 12,    // Buttons
  lg: 16,    // Large cards
  xl: 20,    // Chips, tags
  xxl: 25,   // Pills, CTAs
  round: 50, // Fully rounded
  circle: 9999, // Perfect circles
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 64,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const opacity = {
  disabled: 0.4,
  placeholder: 0.6,
  secondary: 0.8,
  overlay: 0.9,
} as const;

// Session Screen Specific Tokens
export const sessionTokens = {
  breathingCircle: {
    size: 260,
    borderWidth: 3,
  },
  durationChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 60,
  },
  header: {
    height: 100,
    paddingTop: 60,
  },
  gradients: {
    morningEnergy: ['#FF6B6B', '#FFE66D', '#9AE6B4'], // coral → sunny yellow → mint
    eveningCalm: ['#6C5CE7', '#74B9FF', '#FD79A8'],   // purple → blue → coral
  },
} as const;