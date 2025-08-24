import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MeditationSession {
  id: string;
  date: string;
  duration: number; // in seconds
  mode: 'morning' | 'evening';
  breathingPattern: string;
  ambientSound: string;
  completedAt: string;
}

export interface UserStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string;
  favoriteMode: 'morning' | 'evening';
  favoritePattern: string;
  favoriteSound: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const STORAGE_KEYS = {
  SESSIONS: '@meditation_sessions',
  STATS: '@user_stats',
  ACHIEVEMENTS: '@achievements'
};

export const achievements: Achievement[] = [
  {
    id: 'first_session',
    title: 'First Breath',
    description: 'Complete your first meditation session',
    icon: '🌱',
    unlocked: false
  },
  {
    id: 'week_streak',
    title: 'Weekly Warrior',
    description: 'Meditate for 7 days in a row',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'morning_person',
    title: 'Morning Person',
    description: 'Complete 10 morning sessions',
    icon: '🌅',
    unlocked: false
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete 10 evening sessions',
    icon: '🌙',
    unlocked: false
  },
  {
    id: 'zen_master',
    title: 'Zen Master',
    description: 'Complete 50 meditation sessions',
    icon: '🧘',
    unlocked: false
  },
  {
    id: 'time_keeper',
    title: 'Time Keeper',
    description: 'Meditate for 10 hours total',
    icon: '⏰',
    unlocked: false
  }
];

export class ProgressTracker {
  private static instance: ProgressTracker;

  private constructor() {}

  static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker();
    }
    return ProgressTracker.instance;
  }

  async saveSession(sessionData: Omit<MeditationSession, 'id' | 'completedAt'>): Promise<void> {
    try {
      const session: MeditationSession = {
        ...sessionData,
        id: Date.now().toString(),
        completedAt: new Date().toISOString()
      };

      const sessions = await this.getSessions();
      sessions.push(session);
      
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
      await this.updateStats();
      await this.checkAchievements();
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  async getSessions(): Promise<MeditationSession[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get sessions:', error);
      return [];
    }
  }

  async getStats(): Promise<UserStats> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
      if (data) {
        return JSON.parse(data);
      }
      
      // Return default stats
      return {
        totalSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastSessionDate: '',
        favoriteMode: 'morning',
        favoritePattern: 'basic',
        favoriteSound: 'silence'
      };
    } catch (error) {
      console.error('Failed to get stats:', error);
      return {
        totalSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastSessionDate: '',
        favoriteMode: 'morning',
        favoritePattern: 'basic',
        favoriteSound: 'silence'
      };
    }
  }

  private async updateStats(): Promise<void> {
    try {
      const sessions = await this.getSessions();
      
      const stats: UserStats = {
        totalSessions: sessions.length,
        totalMinutes: Math.round(sessions.reduce((total, session) => total + session.duration / 60, 0)),
        currentStreak: this.calculateCurrentStreak(sessions),
        longestStreak: this.calculateLongestStreak(sessions),
        lastSessionDate: sessions.length > 0 ? sessions[sessions.length - 1].date : '',
        favoriteMode: (this.getMostFrequent(sessions, 'mode') as 'morning' | 'evening') || 'morning',
        favoritePattern: this.getMostFrequent(sessions, 'breathingPattern') || 'basic',
        favoriteSound: this.getMostFrequent(sessions, 'ambientSound') || 'silence'
      };

      await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to update stats:', error);
    }
  }

  private calculateCurrentStreak(sessions: MeditationSession[]): number {
    if (sessions.length === 0) return 0;

    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date);
      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = new Date(sessionDate);
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }

  private calculateLongestStreak(sessions: MeditationSession[]): number {
    if (sessions.length === 0) return 0;

    const sessionDates = [...new Set(sessions.map(s => s.date))].sort();
    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sessionDates.length; i++) {
      const prevDate = new Date(sessionDates[i - 1]);
      const currentDate = new Date(sessionDates[i]);
      const daysDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return longestStreak;
  }

  private getMostFrequent<T extends keyof MeditationSession>(sessions: MeditationSession[], key: T): string {
    const frequency: { [key: string]: number } = {};
    
    sessions.forEach(session => {
      const value = session[key] as string;
      frequency[value] = (frequency[value] || 0) + 1;
    });

    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b, '');
  }

  async getAchievements(): Promise<Achievement[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : achievements;
    } catch (error) {
      console.error('Failed to get achievements:', error);
      return achievements;
    }
  }

  private async checkAchievements(): Promise<Achievement[]> {
    try {
      const sessions = await this.getSessions();
      const stats = await this.getStats();
      const currentAchievements = await this.getAchievements();
      const newlyUnlocked: Achievement[] = [];

      const updatedAchievements = currentAchievements.map(achievement => {
        if (achievement.unlocked) return achievement;

        let shouldUnlock = false;

        switch (achievement.id) {
          case 'first_session':
            shouldUnlock = sessions.length >= 1;
            break;
          case 'week_streak':
            shouldUnlock = stats.currentStreak >= 7;
            break;
          case 'morning_person':
            shouldUnlock = sessions.filter(s => s.mode === 'morning').length >= 10;
            break;
          case 'night_owl':
            shouldUnlock = sessions.filter(s => s.mode === 'evening').length >= 10;
            break;
          case 'zen_master':
            shouldUnlock = sessions.length >= 50;
            break;
          case 'time_keeper':
            shouldUnlock = stats.totalMinutes >= 600; // 10 hours
            break;
        }

        if (shouldUnlock) {
          const unlockedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString()
          };
          newlyUnlocked.push(unlockedAchievement);
          return unlockedAchievement;
        }

        return achievement;
      });

      await AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(updatedAchievements));
      return newlyUnlocked;
    } catch (error) {
      console.error('Failed to check achievements:', error);
      return [];
    }
  }

  async getWeeklyProgress(): Promise<{ date: string; minutes: number }[]> {
    try {
      const sessions = await this.getSessions();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const weekSessions = sessions.filter(session => 
        new Date(session.date) >= weekAgo
      );

      const dailyMinutes: { [date: string]: number } = {};
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        dailyMinutes[dateStr] = 0;
      }

      weekSessions.forEach(session => {
        const dateStr = new Date(session.date).toDateString();
        dailyMinutes[dateStr] += session.duration / 60;
      });

      return Object.entries(dailyMinutes)
        .map(([date, minutes]) => ({ date, minutes: Math.round(minutes) }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      console.error('Failed to get weekly progress:', error);
      return [];
    }
  }
}
