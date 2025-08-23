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
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(breathingScale, {
          toValue: 1,
          duration: 3000,
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
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome back
        </Text>
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
    paddingTop: 80, // iPhone safe area + spacing
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheadText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
  
  // Breathing Circle Section
  circleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  breathingCircle: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  breatheText: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
  
  // Practice Cards Section
  cardsSection: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingBottom: 60, // Increased bottom padding
    paddingTop: 20, // Added top padding
  },
  practiceCard: {
    flex: 1,
    height: 140, // Increased height
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8, // Increased shadow
    },
    shadowOpacity: 0.15, // Increased opacity
    shadowRadius: 16, // Increased radius
    elevation: 8, // Increased elevation
  },
  cardActive: {
    transform: [{ scale: 0.98 }],
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 32, // Increased size
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18, // Increased size
    fontWeight: '700', // Bolder
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
