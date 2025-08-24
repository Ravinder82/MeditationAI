import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { spacing, shadows } from '../constants/DesignTokens';
import { ProgressTracker } from '../lib/progressTracker';

const Header = () => {
  const [totalHours, setTotalHours] = useState(0);
  
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const dayNumber = now.getDate();

  useEffect(() => {
    const loadStats = async () => {
      const tracker = ProgressTracker.getInstance();
      const stats = await tracker.getStats();
      setTotalHours(Math.floor(stats.totalMinutes / 60));
    };
    loadStats();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.dynamicIsland}
        onPress={() => router.push('/settings')}
        activeOpacity={0.8}
      >
        <View style={styles.leftContent}>
          <MaterialIcons name="account-circle" size={24} color="#FFFFFF" />
          <Text style={styles.hoursText}>{totalHours}h</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={styles.numberText}>{dayNumber}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: spacing.xxxl + spacing.xl, // Safe area + spacing
    paddingBottom: spacing.lg,
  },
  dynamicIsland: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 50, // Very high border radius for pill shape
    marginHorizontal: 20, // Side margins for screen fitting
    width: '90%', // Dynamic width fitting
    maxWidth: 400, // Maximum width constraint
    ...shadows.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rightContent: {
    alignItems: 'center',
  },
  hoursText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: -2,
  },
});

export default Header;
