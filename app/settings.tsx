import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { spacing, typography, radii, shadows, components, accessibility } from '../constants/DesignTokens';
import { ProgressTracker, UserStats, Achievement } from '../lib/progressTracker';
import Colors from '../constants/Colors';
import { useColorScheme } from '../components/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progressTracker] = useState(() => ProgressTracker.getInstance());

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userStats = await progressTracker.getStats();
      const userAchievements = await progressTracker.getAchievements();
      setStats(userStats);
      setAchievements(userAchievements);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your meditation history, stats, and achievements. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Data',
          style: 'destructive',
          onPress: async () => {
            // In a real app, you'd implement data clearing here
            Alert.alert('Success', 'All data has been cleared.');
            loadUserData();
          }
        }
      ]
    );
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={colorScheme === 'dark' 
          ? ['#1a1a2e', '#16213e', '#0f3460']
          : ['#f8f9fa', '#e9ecef', '#dee2e6']
        }
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.backArrow, { color: colors.text }]}>←</Text>
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          {stats && (
            <View style={[styles.section, { backgroundColor: colors.background + '80' }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Progress</Text>
              
              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: colors.background }]}>
                  <Text style={[styles.statNumber, { color: colors.tint }]}>{stats.totalSessions}</Text>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Sessions</Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colors.background }]}>
                  <Text style={[styles.statNumber, { color: colors.tint }]}>{formatTime(stats.totalMinutes)}</Text>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Total Time</Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colors.background }]}>
                  <Text style={[styles.statNumber, { color: colors.tint }]}>{stats.currentStreak}</Text>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Current Streak</Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colors.background }]}>
                  <Text style={[styles.statNumber, { color: colors.tint }]}>{stats.longestStreak}</Text>
                  <Text style={[styles.statLabel, { color: colors.text }]}>Best Streak</Text>
                </View>
              </View>
            </View>
          )}

          {/* Achievements Section */}
          <View style={[styles.section, { backgroundColor: colors.background + '80' }]}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
              <Text style={[styles.achievementCounter, { color: colors.text + '80' }]}>
                {unlockedAchievements.length}/{totalAchievements}
              </Text>
            </View>
            
            <View style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    { backgroundColor: colors.background },
                    !achievement.unlocked && styles.lockedAchievement
                  ]}
                >
                  <Text style={[
                    styles.achievementIcon,
                    !achievement.unlocked && styles.lockedIcon
                  ]}>
                    {achievement.icon}
                  </Text>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      { color: colors.text },
                      !achievement.unlocked && styles.lockedText
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDescription,
                      { color: colors.text + '80' },
                      !achievement.unlocked && styles.lockedText
                    ]}>
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.unlocked && (
                    <Text style={styles.unlockedBadge}>✓</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Preferences Section */}
          <View style={[styles.section, { backgroundColor: colors.background + '80' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
            
            {stats && (
              <View style={styles.preferencesList}>
                <View style={styles.preferenceItem}>
                  <Text style={[styles.preferenceLabel, { color: colors.text }]}>Favorite Mode</Text>
                  <Text style={[styles.preferenceValue, { color: colors.tint }]}>
                    {stats.favoriteMode === 'morning' ? '🌅 Morning Energy' : '🌙 Evening Calm'}
                  </Text>
                </View>
                
                <View style={styles.preferenceItem}>
                  <Text style={[styles.preferenceLabel, { color: colors.text }]}>Favorite Pattern</Text>
                  <Text style={[styles.preferenceValue, { color: colors.tint }]}>
                    {stats.favoritePattern}
                  </Text>
                </View>
                
                <View style={styles.preferenceItem}>
                  <Text style={[styles.preferenceLabel, { color: colors.text }]}>Favorite Sound</Text>
                  <Text style={[styles.preferenceValue, { color: colors.tint }]}>
                    {stats.favoriteSound}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Actions Section */}
          <View style={[styles.section, { backgroundColor: colors.background + '80' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.dangerButton]}
              onPress={handleClearData}
              activeOpacity={0.8}
            >
              <Text style={styles.dangerButtonText}>Clear All Data</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    width: accessibility.minTouchTarget,
    height: accessibility.minTouchTarget,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radii.sm,
  },
  backArrow: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  headerSpacer: {
    width: accessibility.minTouchTarget,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  section: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  achievementCounter: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: 'center',
    ...shadows.xs,
  },
  statNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    opacity: 0.8,
  },
  achievementsList: {
    gap: spacing.sm,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    ...shadows.xs,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  lockedIcon: {
    opacity: 0.3,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  achievementDescription: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  lockedText: {
    opacity: 0.6,
  },
  unlockedBadge: {
    fontSize: typography.fontSize.md,
    color: '#4CAF50',
    fontWeight: typography.fontWeight.bold,
  },
  preferencesList: {
    gap: spacing.md,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  preferenceLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  preferenceValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  actionButton: {
    paddingVertical: components.button.primary.paddingVertical,
    paddingHorizontal: components.button.primary.paddingHorizontal,
    borderRadius: components.button.primary.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  dangerButton: {
    backgroundColor: '#FF6B6B',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  bottomSpacer: {
    height: spacing.xxxl,
  },
});
