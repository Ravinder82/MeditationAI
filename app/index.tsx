import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { useColorScheme } from '../components/useColorScheme';
import { spacing, typography, shadows, animations, components, accessibility, radii } from '../constants/DesignTokens';
import Header from '../components/Header';

export default function Index() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const meditationColors = Colors.meditation; // Direct access to our beautiful palette
  
  const [morningActive, setMorningActive] = useState(false);
  const [eveningActive, setEveningActive] = useState(false);
  
  // Ultra-refined breathing animation with micro-interactions
  const [scaleValue] = useState(new Animated.Value(1));
  const [opacityValue] = useState(new Animated.Value(1));
  const [glowValue] = useState(new Animated.Value(0));
  const [pulseValue] = useState(new Animated.Value(1));
  
  const startBreathingAnimation = (duration: number) => {
    const inhaleDuration = duration * 0.4;
    const exhaleDuration = duration * 0.6;
    const microPause = 200; // Subtle pause for realism
    
    Animated.loop(
      Animated.sequence([
        // Micro-interaction: Subtle anticipation before inhale
        Animated.timing(pulseValue, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        // Inhale: Smooth expansion with organic easing
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.25,
            duration: inhaleDuration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Natural breathing curve
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0.85,
            duration: inhaleDuration,
            useNativeDriver: true,
          }),
          Animated.timing(glowValue, {
            toValue: 1,
            duration: inhaleDuration,
            useNativeDriver: true,
          }),
        ]),
        // Micro-pause at peak inhale
        Animated.delay(microPause),
        // Exhale: Gentle contraction with deceleration
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: exhaleDuration,
            easing: Easing.bezier(0.42, 0, 0.58, 1), // Natural deceleration
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: exhaleDuration,
            useNativeDriver: true,
          }),
          Animated.timing(glowValue, {
            toValue: 0,
            duration: exhaleDuration,
            useNativeDriver: true,
          }),
        ]),
        // Micro-interaction: Subtle settling at exhale completion
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  useEffect(() => {
    startBreathingAnimation(4000);
  }, []);
  
  // Haptic-like visual feedback for touch interactions
  const [morningScale] = useState(new Animated.Value(1));
  const [eveningScale] = useState(new Animated.Value(1));
  const [morningGlow] = useState(new Animated.Value(0));
  const [eveningGlow] = useState(new Animated.Value(0));

  const createTouchFeedback = (scaleAnim: Animated.Value, glowAnim: Animated.Value) => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.96,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.02,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handleMorningPress = () => {
    createTouchFeedback(morningScale, morningGlow);
    setTimeout(() => {
      router.push('/session?mode=morning' as any);
    }, 200);
  };

  const handleEveningPress = () => {
    createTouchFeedback(eveningScale, eveningGlow);
    setTimeout(() => {
      router.push('/session?mode=evening' as any);
    }, 200);
  };
  
  // Theme-based colors
  const getThemeColors = () => {
    switch (colorScheme) {
      case 'dark':
        return {
          circleStroke: meditationColors.sunrise.coral,
          circleFill: meditationColors.sunrise.coral + '1A', // 10% opacity
        };
      default: // light
        return {
          circleStroke: meditationColors.sunrise.coral,
          circleFill: meditationColors.sunrise.coral + '1A', // 10% opacity
        };
    }
  };
  
  const themeColors = getThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <Header />
      
      {/* Breathing Circle Section */}
      <View style={styles.circleSection}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              transform: [{ scale: scaleValue }, { scale: pulseValue }],
              opacity: opacityValue,
              borderColor: themeColors.circleStroke,
              backgroundColor: themeColors.circleStroke + '15',
              shadowColor: themeColors.circleStroke,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: glowValue,
              shadowRadius: 20,
              elevation: glowValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
            },
          ]}
        >
          <View style={styles.circleInner}>
            <Text style={[styles.breatheText, { color: themeColors.circleStroke }]}>
              Breathe
            </Text>
          </View>
        </Animated.View>
      </View>
      
      {/* Practice Cards Section */}
      <View style={styles.cardsSection}>
        {/* Morning Energy Card */}
        <TouchableOpacity
          style={[
            styles.practiceCard,
            morningActive && styles.cardActive,
          ]}
          onPressIn={() => setMorningActive(true)}
          onPressOut={() => setMorningActive(false)}
          onPress={handleMorningPress}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[
              meditationColors.sunrise.coral,  // Vibrant awakening energy
              meditationColors.sunrise.golden  // Soft golden sunlight
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>🌅</Text>
              <Text style={styles.cardTitle}>Morning Energy</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        
        {/* Evening Calm Card */}
        <TouchableOpacity
          style={[
            styles.practiceCard,
            eveningActive && styles.cardActive,
          ]}
          onPressIn={() => setEveningActive(true)}
          onPressOut={() => setEveningActive(false)}
          onPress={handleEveningPress}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[
              meditationColors.sunset.deepPurple,   // Mystical twilight
              meditationColors.sunset.twilightBlue  // Evening calm
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardIcon}>🌙</Text>
              <Text style={styles.cardTitle}>Evening Calm</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingTop: spacing.xxxl + spacing.xl, // Safe area + spacing
    marginBottom: spacing.xxxl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  settingsButton: {
    width: accessibility.minTouchTarget,
    height: accessibility.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radii.sm,
  },
  settingsIcon: {
    fontSize: typography.fontSize.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: spacing.sm,
    textAlign: 'center',
    lineHeight: typography.fontSize.xxl * typography.lineHeight.snug,
  },
  subheadText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    textAlign: 'center',
    opacity: 0.7,
  },
  
  // Breathing Circle Section
  circleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl + spacing.md,
  },
  breathingCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.xs, // Subtle shadow for depth
  },
  circleInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  breatheText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
  },
  
  // Practice Cards Section
  cardsSection: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    paddingTop: spacing.lg,
  },
  practiceCard: {
    flex: 1,
    height: 140,
    borderRadius: components.card.borderRadius,
    overflow: 'hidden',
    ...shadows.lg, // Enhanced shadow for modern look
  },
  cardActive: {
    transform: [{ scale: animations.scale.press }],
  },
  cardGradient: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 36, // Larger for better visual impact
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.fontSize.md * typography.lineHeight.snug,
  },
});
