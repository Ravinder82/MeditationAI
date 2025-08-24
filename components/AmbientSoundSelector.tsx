import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { spacing, typography, radii, shadows } from '../constants/DesignTokens';
import { AudioManager, ambientSounds, AmbientSound } from '../lib/audioManager';

interface AmbientSoundSelectorProps {
  onSoundSelect?: (soundId: string) => void;
  selectedSound?: string;
  visible?: boolean;
}

export default function AmbientSoundSelector({ 
  onSoundSelect, 
  selectedSound = 'silence',
  visible = true 
}: AmbientSoundSelectorProps) {
  const [audioManager] = useState(() => AudioManager.getInstance());
  const [volume, setVolume] = useState(0.5);
  const fadeAnim = useState(new Animated.Value(visible ? 1 : 0))[0];

  useEffect(() => {
    audioManager.initialize();
  }, [audioManager]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, fadeAnim]);

  const handleSoundSelect = async (sound: AmbientSound) => {
    try {
      await audioManager.playAmbientSound(sound.id);
      onSoundSelect?.(sound.id);
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    await audioManager.setVolume(newVolume);
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Ambient Sounds</Text>
        <Text style={styles.subtitle}>Choose your meditation atmosphere</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.soundsContainer}
      >
        {ambientSounds.map((sound) => (
          <TouchableOpacity
            key={sound.id}
            style={[
              styles.soundCard,
              selectedSound === sound.id && styles.selectedCard
            ]}
            onPress={() => handleSoundSelect(sound)}
            activeOpacity={0.8}
          >
            <Text style={styles.soundIcon}>{sound.icon}</Text>
            <Text style={[
              styles.soundName,
              selectedSound === sound.id && styles.selectedText
            ]}>
              {sound.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedSound !== 'silence' && (
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabel}>Volume</Text>
          <View style={styles.volumeSlider}>
            <TouchableOpacity
              style={styles.volumeButton}
              onPress={() => handleVolumeChange(Math.max(0, volume - 0.1))}
            >
              <Text style={styles.volumeButtonText}>−</Text>
            </TouchableOpacity>
            
            <View style={styles.volumeTrack}>
              <View 
                style={[
                  styles.volumeFill,
                  { width: `${volume * 100}%` }
                ]} 
              />
            </View>
            
            <TouchableOpacity
              style={styles.volumeButton}
              onPress={() => handleVolumeChange(Math.min(1, volume + 0.1))}
            >
              <Text style={styles.volumeButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animated.View>
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
  soundsContainer: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  soundCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.md,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: 80,
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
  soundIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  soundName: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  volumeContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
  },
  volumeSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  volumeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeButtonText: {
    color: 'white',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  volumeTrack: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
  },
});
