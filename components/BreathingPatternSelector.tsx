import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { spacing, typography, radii, shadows } from '../constants/DesignTokens';

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold?: number;
  exhale: number;
  holdAfter?: number;
  icon: string;
}

export const breathingPatterns: BreathingPattern[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: '4-4 breathing for beginners',
    inhale: 4,
    exhale: 4,
    icon: '🫁'
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: '4-4-4-4 for focus and calm',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfter: 4,
    icon: '⬜'
  },
  {
    id: 'relaxing',
    name: '4-7-8',
    description: 'Deep relaxation technique',
    inhale: 4,
    hold: 7,
    exhale: 8,
    icon: '😌'
  },
  {
    id: 'energizing',
    name: 'Energizing',
    description: '6-2-4 for morning boost',
    inhale: 6,
    hold: 2,
    exhale: 4,
    icon: '⚡'
  }
];

interface BreathingPatternSelectorProps {
  selectedPattern: string;
  onPatternSelect: (patternId: string) => void;
  visible?: boolean;
}

export default function BreathingPatternSelector({
  selectedPattern,
  onPatternSelect,
  visible = true
}: BreathingPatternSelectorProps) {
  if (!visible) return null;

  const formatPattern = (pattern: BreathingPattern) => {
    const parts = [pattern.inhale];
    if (pattern.hold) parts.push(pattern.hold);
    parts.push(pattern.exhale);
    if (pattern.holdAfter) parts.push(pattern.holdAfter);
    return parts.join('-');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathing Pattern</Text>
        <Text style={styles.subtitle}>Choose your breathing rhythm</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.patternsContainer}
      >
        {breathingPatterns.map((pattern) => (
          <TouchableOpacity
            key={pattern.id}
            style={[
              styles.patternCard,
              selectedPattern === pattern.id && styles.selectedCard
            ]}
            onPress={() => onPatternSelect(pattern.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.patternIcon}>{pattern.icon}</Text>
            <Text style={[
              styles.patternName,
              selectedPattern === pattern.id && styles.selectedText
            ]}>
              {pattern.name}
            </Text>
            <Text style={[
              styles.patternTiming,
              selectedPattern === pattern.id && styles.selectedText
            ]}>
              {formatPattern(pattern)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.sm,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  patternsContainer: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  patternCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: 90,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...shadows.xs,
  },
  selectedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    ...shadows.md,
    transform: [{ scale: 1.05 }],
  },
  patternIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  patternName: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 2,
  },
  patternTiming: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
});
