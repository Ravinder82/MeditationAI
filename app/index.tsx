import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { useColorScheme } from '../components/useColorScheme';
import { spacing, typography, shadows, animations, components, accessibility, radii } from '../constants/DesignTokens';

export default function Index() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const meditationColors = Colors.meditation; // Direct access to our beautiful palette
  
  const [morningActive, setMorningActive] = useState(false);
  const [eveningActive, setEveningActive] = useState(false);
  
  // Breathing animation
  const breathingScale = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const breathingAnimation = () => {
      Animated.sequence([
        Animated.timing(breathingScale, {
          toValue: animations.scale.breathe,
          duration: animations.duration.breathing / 2, // 2-second inhale
          useNativeDriver: true,
        }),
        Animated.timing(breathingScale, {
          toValue: 1,
          duration: animations.duration.breathing / 2, // 2-second exhale
          useNativeDriver: true,
        }),
      ]).start(() => breathingAnimation());
    };
    
    breathingAnimation();
  }, [breathingScale]);
  
  const handleMorningPress = () => {
    router.push('/session?mode=morning' as any);
  };
  
  const handleEveningPress = () => {
    router.push('/session?mode=evening' as any);
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
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Welcome back
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.settingsIcon, { color: colors.text }]}>⚙️</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.subheadText, { color: colors.text + '99' }]}>
          Find your moment of peace
        </Text>
      </View>
      
      {/* Breathing Circle Section */}
      <View style={styles.circleSection}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              borderColor: themeColors.circleStroke,
              backgroundColor: themeColors.circleFill,
              transform: [{ scale: breathingScale }],
            }
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
