import { Audio } from 'expo-av';

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const ambientSounds: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    description: 'Gentle rainfall for deep relaxation'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: '🌊',
    description: 'Calming ocean waves'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    description: 'Peaceful forest sounds'
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: '🐦',
    description: 'Gentle bird songs'
  },
  {
    id: 'silence',
    name: 'Silence',
    icon: '🔇',
    description: 'Pure silence for focused meditation'
  }
];

export class AudioManager {
  private static instance: AudioManager;
  private currentSound: Audio.Sound | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.5;

  private constructor() {}

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async playAmbientSound(soundId: string): Promise<void> {
    try {
      await this.stopCurrentSound();

      if (soundId === 'silence') {
        return;
      }

      // For demo, we'll create a simple looping sound
      // In production, replace with actual audio files
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/demo-ambient.mp3'),
        { 
          shouldPlay: true, 
          isLooping: true,
          volume: this.currentVolume
        }
      );

      this.currentSound = sound;
      this.isPlaying = true;
    } catch (error) {
      console.log('Audio file not found, using silence for demo');
      this.isPlaying = soundId !== 'silence';
    }
  }

  async stopCurrentSound(): Promise<void> {
    try {
      if (this.currentSound) {
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }
      this.isPlaying = false;
    } catch (error) {
      console.error('Failed to stop sound:', error);
    }
  }

  async setVolume(volume: number): Promise<void> {
    try {
      this.currentVolume = Math.max(0, Math.min(1, volume));
      if (this.currentSound) {
        await this.currentSound.setVolumeAsync(this.currentVolume);
      }
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }

  getVolume(): number {
    return this.currentVolume;
  }

  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}
