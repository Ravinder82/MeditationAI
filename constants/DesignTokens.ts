// Design Tokens for MeditationAI App
// Reusable design constants for consistent UI implementation

export const spacing = {
  // Ultra-precise spacing system with golden ratio (φ = 1.618)
  micro: 2.472,   // φ^0 * 2
  xs: 4,          // φ^1 * 2.472 ≈ 4
  sm: 6.472,      // φ^2 ≈ 6.472
  md: 10.472,     // φ^3 ≈ 10.472
  lg: 16.944,     // φ^4 ≈ 16.944
  xl: 27.416,     // φ^5 ≈ 27.416
  xxl: 44.361,    // φ^6 ≈ 44.361
  xxxl: 71.777,   // φ^7 ≈ 71.777
  
  // Meditation-specific semantic spacing with golden ratio
  breath: 8.472,  // One breath cycle spacing
  mindful: 13.09, // Mindful pause spacing (φ^3)
  serene: 21.544, // Serene section spacing (φ^4)
  transformative: 34.944, // Transformative gap (φ^5)
  
  // Backward compatibility with enhanced precision
  screenPadding: 24,
  headerPadding: 20,
  componentGap: 16,
  sectionGap: 40,
  buttonPadding: 16,
  
  // Golden ratio micro-adjustments
  golden: {
    micro: 1.618,
    small: 2.618,
    medium: 4.236,
    large: 6.854,
    xlarge: 11.09,
    xxlarge: 17.944,
  },
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
    // Meditation psychology-based typography hierarchy with backward compatibility
    xs: 11,      // Caption text (gentle guidance)
    sm: 13,      // Small labels (subtle indicators)
    base: 16,    // Body text (comfortable reading)
    md: 18,      // Subheadings (calm sections)
    lg: 22,      // Section headers (serene titles)
    xl: 28,      // Page titles (welcoming hero)
    xxl: 36,     // Welcome text (meditative display)
    xxxl: 48,    // Hero text (transformative moments)
    display: 64, // Large display
    micro: 9,    // Ultra-subtle labels (meditation state indicators)
    caption: 11, // Gentle guidance text (breathing cues)
    body: 16,    // Comfortable reading (instructions)
    subheading: 18, // Calm section headers
    title: 22,   // Serene page titles
    hero: 28,    // Welcoming hero text
    heroDisplay: 48, // Transformative hero text
  },
  fontWeight: {
    // Emotional weight scale for meditation with backward compatibility
    light: '300',      // Soft guidance (gentle instructions)
    normal: '400',     // Neutral body text (content)
    medium: '500',     // Focused attention (headers)
    semibold: '600',   // Solid presence (important CTAs)
    bold: '700',       // Powerful moments (achievements)
    heavy: '800',      // Strong emphasis
    ethereal: '200',   // Lightest touch (whispers, breathing cues)
    gentle: '300',     // Soft guidance (subtle instructions)
    calm: '400',       // Neutral body text (content)
    mindful: '500',    // Focused attention (headers)
    grounded: '600',   // Solid presence (important CTAs)
    transformative: '700', // Powerful moments (achievements)
  },
  lineHeight: {
    // Breathing-inspired rhythm with backward compatibility
    tight: 1.1,   // Intimate spacing (whisper text)
    snug: 1.25,   // Comfortable breathing (body text)
    normal: 1.5,  // Natural reading flow
    relaxed: 1.75, // Mindful pauses (headlines)
    loose: 2.0,   // Transformative moments (hero text)
    whisper: 1.1,   // Intimate spacing (micro text)
    gentle: 1.25,   // Comfortable breathing (body text)
    flowing: 1.5,   // Natural reading flow
    spacious: 1.75, // Mindful pauses (headlines)
    expansive: 2.0, // Transformative moments (hero text)
  },
  letterSpacing: {
    // Emotional spacing for meditation states with backward compatibility
    tight: -0.5,      // Close, personal guidance
    normal: 0,        // Neutral reading
    wide: 0.5,        // Spacious awareness
    wider: 1.0,       // Expansive presence
    intimate: -0.5,   // Close, personal guidance
    natural: 0,       // Neutral reading
    mindful: 0.5,     // Spacious awareness
    transcendent: 1.0, // Expansive presence
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
  // Ultra-refined glassmorphism shadows
  glass: {
    light: {
      // Multi-layer depth with golden ratio proportions
      shadowColor: 'rgba(255, 255, 255, 0.8)',
      shadowOffset: { width: -4.236, height: -4.236 }, // Golden ratio
      shadowOpacity: 0.7,
      shadowRadius: 13.09, // Golden ratio
      elevation: 12,
    },
    dark: {
      shadowColor: 'rgba(255, 255, 255, 0.1)',
      shadowOffset: { width: -4.236, height: -4.236 },
      shadowOpacity: 0.1,
      shadowRadius: 13.09,
      elevation: 12,
    },
  },
  // Ultra-subtle shadows with mathematical precision
  subtle: {
    light: {
      shadowColor: 'rgba(0, 0, 0, 0.03)',
      shadowOffset: { width: 0, height: 1.618 }, // Golden ratio
      shadowOpacity: 0.05,
      shadowRadius: 4.236, // Golden ratio
      elevation: 1,
    },
    dark: {
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowOffset: { width: 0, height: 1.618 },
      shadowOpacity: 0.15,
      shadowRadius: 4.236,
      elevation: 1,
    },
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