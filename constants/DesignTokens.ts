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
    xs: 11,      // Caption text
    sm: 13,      // Small labels
    base: 16,    // Body text
    md: 18,      // Subheadings
    lg: 22,      // Section headers
    xl: 28,      // Page titles
    xxl: 36,     // Welcome text
    xxxl: 48,    // Hero text
    display: 64, // Large display
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2.0,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
  },
} as const;

export const shadows = {
  // Subtle shadows for modern UI
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  // Colored shadows for meditation cards
  meditation: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const opacity = {
  disabled: 0.4,
  placeholder: 0.6,
  secondary: 0.7,
  primary: 0.9,
  overlay: 0.95,
  glass: 0.1,     // For glassmorphism effects
  blur: 0.8,      // For backdrop blur
} as const;

// Animation tokens for smooth interactions
export const animations = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    breathing: 4000, // 4-second breathing cycle
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  scale: {
    press: 0.96,
    hover: 1.02,
    breathe: 1.1,
  },
} as const;

// Touch targets and accessibility
export const accessibility = {
  minTouchTarget: 44,  // iOS minimum
  preferredTouchTarget: 48, // Android preferred
  focusRing: {
    width: 2,
    color: '#007AFF',
    offset: 2,
  },
} as const;

// Session Screen Specific Tokens
export const sessionTokens = {
  breathingCircle: {
    size: 260,
    borderWidth: 3,
    animationDuration: 4000, // 4-second breathing cycle
  },
  durationChip: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    minWidth: 72,
    minHeight: 48, // Accessibility touch target
  },
  header: {
    height: 120,
    paddingTop: 60,
    blurRadius: 20,
  },
  gradients: {
    morningEnergy: {
      colors: ['#FF6B6B', '#FFE66D', '#9AE6B4'],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    eveningCalm: {
      colors: ['#6C5CE7', '#74B9FF', '#FD79A8'],
      locations: [0, 0.5, 1], 
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    backdropFilter: 'blur(20px)',
  },
} as const;

// Component-specific design tokens
export const components = {
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    minHeight: 120,
    ...shadows.md,
  },
  button: {
    primary: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: radii.xxl,
      minHeight: accessibility.preferredTouchTarget,
      ...shadows.sm,
    },
    secondary: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: radii.md,
      minHeight: accessibility.minTouchTarget,
      borderWidth: 1,
    },
  },
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    minHeight: accessibility.preferredTouchTarget,
    borderWidth: 1,
  },
} as const;