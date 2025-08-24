import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { spacing, radii, typography, shadows, sessionTokens, animations, components, accessibility } from '../constants/DesignTokens';
import AmbientSoundSelector from '../components/AmbientSoundSelector';
import BreathingPatternSelector, { breathingPatterns } from '../components/BreathingPatternSelector';
import { AudioManager } from '../lib/audioManager';
import { ProgressTracker } from '../lib/progressTracker';

type SessionMode = 'morning' | 'evening';
type Duration = 5 | 10 | 15 | 20;
type SessionPhase = 'ready' | 'active' | 'paused' | 'completed';

interface MeditationSession {
  duration: number; // in seconds
  phase: SessionPhase;
}

export default function SessionScreen() {
  const { mode = 'morning' } = useLocalSearchParams<{ mode: SessionMode }>();
  const [selectedDuration, setSelectedDuration] = useState<Duration>(10);
  const [session, setSession] = useState<MeditationSession>({
    duration: 600, // 10 minutes default
    phase: 'ready'
  });
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedSound, setSelectedSound] = useState('silence');
  const [selectedPattern, setSelectedPattern] = useState('basic');
  const [audioManager] = useState(() => AudioManager.getInstance());
  const [progressTracker] = useState(() => ProgressTracker.getInstance());
  
  // Animation values
  const breathingAnimation = useRef(new Animated.Value(1)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  
  const isMorning = mode === 'morning';

  // Initialize audio on mount
  useEffect(() => {
    audioManager.initialize();
    return () => {
      audioManager.stopCurrentSound();
    };
  }, [audioManager]);
  
  // Breathing animation effect with pattern support
  useEffect(() => {
    if (session.phase === 'active') {
      const pattern = breathingPatterns.find(p => p.id === selectedPattern) || breathingPatterns[0];
      
      const breathingCycle = () => {
        const sequence = [];
        
        // Inhale
        sequence.push(
          Animated.timing(breathingAnimation, {
            toValue: animations.scale.breathe,
            duration: pattern.inhale * 1000,
            useNativeDriver: true,
          })
        );
        
        // Hold after inhale
        if (pattern.hold) {
          sequence.push(
            Animated.timing(breathingAnimation, {
              toValue: animations.scale.breathe,
              duration: pattern.hold * 1000,
              useNativeDriver: true,
            })
          );
        }
        
        // Exhale
        sequence.push(
          Animated.timing(breathingAnimation, {
            toValue: 1,
            duration: pattern.exhale * 1000,
            useNativeDriver: true,
          })
        );
        
        // Hold after exhale
        if (pattern.holdAfter) {
          sequence.push(
            Animated.timing(breathingAnimation, {
              toValue: 1,
              duration: pattern.holdAfter * 1000,
              useNativeDriver: true,
            })
          );
        }
        
        Animated.sequence(sequence).start(() => {
          if (session.phase === 'active') {
            breathingCycle();
          }
        });
      };
      breathingCycle();
    }
  }, [session.phase, selectedPattern, breathingAnimation]);
  
  // Timer countdown effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (session.phase === 'active' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSession(current => ({ ...current, phase: 'completed' }));
            audioManager.stopCurrentSound();
            
            // Save completed session
            progressTracker.saveSession({
              date: new Date().toDateString(),
              duration: session.duration,
              mode: isMorning ? 'morning' : 'evening',
              breathingPattern: selectedPattern,
              ambientSound: selectedSound
            });
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.phase, timeLeft]);
  
  // Progress animation
  useEffect(() => {
    const progress = 1 - (timeLeft / session.duration);
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: animations.duration.normal,
      useNativeDriver: false,
    }).start();
  }, [timeLeft, session.duration, progressAnimation]);
  
  // Get session configuration
  const getSessionConfig = () => {
    if (isMorning) {
      return {
        title: 'Morning Energy',
        description: 'Start your day with focused breathing and positive intention',
        gradientColors: sessionTokens.gradients.morningEnergy,
        emoji: '🌅',
      };
    } else {
      return {
        title: 'Evening Calm',
        description: 'Unwind and release the tensions of your day',
        gradientColors: sessionTokens.gradients.eveningCalm,
        emoji: '🌙',
      };
    }
  };
  
  const sessionConfig = getSessionConfig();
  const durations: Duration[] = [5, 10, 15, 20];
  
  const handleBeginMeditation = async () => {
    const durationInSeconds = selectedDuration * 60;
    setSession({ duration: durationInSeconds, phase: 'active' });
    setTimeLeft(durationInSeconds);
    
    // Start ambient sound
    if (selectedSound !== 'silence') {
      await audioManager.playAmbientSound(selectedSound);
    }
  };
  
  const pauseResumeMeditation = () => {
    setSession(current => ({
      ...current,
      phase: current.phase === 'active' ? 'paused' : 'active'
    }));
  };
  
  const stopMeditation = () => {
    Alert.alert(
      'End Session?',
      'Are you sure you want to end your meditation session?',
      [
        { text: 'Continue', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: async () => {
            await audioManager.stopCurrentSound();
            setSession({ duration: selectedDuration * 60, phase: 'ready' });
            setTimeLeft(selectedDuration * 60);
            Animated.timing(progressAnimation, {
              toValue: 0,
              duration: animations.duration.normal,
              useNativeDriver: false,
            }).start();
          }
        }
      ]
    );
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getSessionMessage = () => {
    switch (session.phase) {
      case 'ready':
        return isMorning 
          ? 'Set an intention for your day ahead'
          : 'Prepare to unwind and let go of the day';
      case 'active':
        return 'Follow your breath and stay present';
      case 'paused':
        return 'Session paused. Resume when ready';
      case 'completed':
        return isMorning
          ? 'Great start! Carry this peace into your day'
          : 'Well done. Sleep peacefully tonight';
      default:
        return sessionConfig.description;
    }
  };

  // Completion screen
  if (session.phase === 'completed') {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient
          colors={[...sessionConfig.gradientColors.colors].reverse() as any}
          style={StyleSheet.absoluteFillObject}
          start={sessionConfig.gradientColors.start}
          end={sessionConfig.gradientColors.end}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.completedContainer}>
            <Text style={styles.completedEmoji}>
              {sessionConfig.emoji}
            </Text>
            <Text style={styles.completedTitle}>Session Complete</Text>
            <Text style={styles.completedMessage}>
              {getSessionMessage()}
            </Text>
            <View style={styles.completedActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={() => router.push('/')}
              >
                <Text style={styles.primaryButtonText}>Return Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => {
                  setSession({ duration: selectedDuration * 60, phase: 'ready' });
                  setTimeLeft(selectedDuration * 60);
                }}
              >
                <Text style={[styles.secondaryButtonText, { color: 'white' }]}>
                  Meditate Again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={sessionConfig.gradientColors.colors}
        style={StyleSheet.absoluteFillObject}
        start={sessionConfig.gradientColors.start}
        end={sessionConfig.gradientColors.end}
      />
      
      {/* Soft Blur Overlay near Header */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.1)', 'transparent']}
        style={styles.headerBlur}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>{sessionConfig.title}</Text>
          
          {/* Spacer for center alignment */}
          <View style={styles.headerSpacer} />
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Session Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sessionEmoji}>{sessionConfig.emoji}</Text>
            <Text style={styles.description}>
              {getSessionMessage()}
            </Text>
          </View>
          
          {/* Duration Selection (only when ready) */}
          {session.phase === 'ready' && (
            <View style={styles.durationSection}>
              <Text style={styles.durationLabel}>Session Duration</Text>
              <View style={styles.durationChips}>
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationChip,
                      selectedDuration === duration && styles.selectedChip
                    ]}
                    onPress={() => setSelectedDuration(duration)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.chipText,
                      selectedDuration === duration && styles.selectedChipText
                    ]}>
                      {duration}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {/* Breathing Pattern Selection (only when ready) */}
          {session.phase === 'ready' && (
            <BreathingPatternSelector
              selectedPattern={selectedPattern}
              onPatternSelect={setSelectedPattern}
              visible={true}
            />
          )}
          
          {/* Ambient Sound Selection (only when ready) */}
          {session.phase === 'ready' && (
            <AmbientSoundSelector
              selectedSound={selectedSound}
              onSoundSelect={setSelectedSound}
              visible={true}
            />
          )}
          
          {/* Breathing Circle */}
          <View style={styles.breathingSection}>
            <Animated.View
              style={[
                styles.breathingCircle,
                {
                  transform: [{ scale: breathingAnimation }],
                }
              ]}
            >
              <Text style={styles.breathingLabel}>
                {session.phase === 'ready' ? 'Ready' : 
                 session.phase === 'paused' ? 'Paused' : 'Breathe'}
              </Text>
            </Animated.View>
            
            {/* Progress Ring */}
            {session.phase !== 'ready' && (
              <View style={styles.progressRing}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      height: progressAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    }
                  ]}
                />
              </View>
            )}
          </View>
          
          {/* Timer Display */}
          {session.phase !== 'ready' && (
            <Text style={styles.timerDisplay}>
              {formatTime(timeLeft)}
            </Text>
          )}
        </View>
        
        {/* Bottom Controls */}
        <View style={styles.bottomSection}>
          {session.phase === 'ready' ? (
            <TouchableOpacity
              style={styles.beginButton}
              onPress={handleBeginMeditation}
              activeOpacity={0.9}
            >
              <Text style={styles.beginButtonText}>Begin Meditation</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.activeControls}>
              <TouchableOpacity
                style={[styles.controlButton, styles.pauseButton]}
                onPress={pauseResumeMeditation}
              >
                <Text style={styles.controlButtonText}>
                  {session.phase === 'active' ? 'Pause' : 'Resume'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.stopButton]}
                onPress={stopMeditation}
              >
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  headerBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.headerPadding,
    paddingBottom: spacing.md,
    height: sessionTokens.header.height,
    zIndex: 2,
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
    color: 'white',
    fontWeight: typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: 'white',
    textAlign: 'center',
  },
  headerSpacer: {
    width: accessibility.minTouchTarget,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  sessionEmoji: {
    fontSize: typography.fontSize.display,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: 'white',
    textAlign: 'center',
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
    opacity: 0.9,
    maxWidth: 280,
  },
  durationSection: {
    alignItems: 'center',
    marginTop: spacing.sectionGap,
  },
  durationLabel: {
    fontSize: typography.fontSize.sm,
    color: 'white',
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.lg,
    opacity: 0.8,
  },
  durationChips: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  durationChip: {
    paddingHorizontal: sessionTokens.durationChip.paddingHorizontal,
    paddingVertical: sessionTokens.durationChip.paddingVertical,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    minWidth: sessionTokens.durationChip.minWidth,
    minHeight: sessionTokens.durationChip.minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  selectedChip: {
    borderColor: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    ...shadows.md,
    transform: [{ scale: 1.05 }],
  },
  chipText: {
    fontSize: typography.fontSize.sm,
    color: 'white',
    fontWeight: typography.fontWeight.medium,
    opacity: 0.8,
  },
  selectedChipText: {
    opacity: 1,
    fontWeight: typography.fontWeight.semibold,
  },
  breathingSection: {
    alignItems: 'center',
    marginTop: spacing.sectionGap,
  },
  breathingCircle: {
    width: sessionTokens.breathingCircle.size,
    height: sessionTokens.breathingCircle.size,
    borderRadius: sessionTokens.breathingCircle.size / 2,
    borderWidth: sessionTokens.breathingCircle.borderWidth,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.xl,
  },
  breathingLabel: {
    fontSize: typography.fontSize.xl,
    color: 'white',
    fontWeight: typography.fontWeight.semibold,
  },
  bottomSection: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.xl,
  },
  beginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: components.button.primary.paddingVertical,
    paddingHorizontal: components.button.primary.paddingHorizontal,
    borderRadius: components.button.primary.borderRadius,
    minHeight: components.button.primary.minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  beginButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: '#2D3748',
  },
  timerDisplay: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  progressRing: {
    position: 'absolute',
    left: -8,
    bottom: -8,
    width: 8,
    height: sessionTokens.breathingCircle.size + 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
  },
  activeControls: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
    justifyContent: 'center',
  },
  controlButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.xxl,
    minWidth: 120,
    minHeight: accessibility.preferredTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  pauseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  stopButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  controlButtonText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  completedEmoji: {
    fontSize: typography.fontSize.display,
    marginBottom: spacing.lg,
  },
  completedTitle: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  completedMessage: {
    fontSize: typography.fontSize.md,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: spacing.xxxl,
    lineHeight: typography.fontSize.md * typography.lineHeight.relaxed,
  },
  completedActions: {
    width: '100%',
    gap: spacing.md,
  },
  actionButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radii.xxl,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryButtonText: {
    color: '#2D3748',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
});