// Core types for BewegungsLiga+ app
export interface UserProfile {
  basic_info: {
    name: string;
    age: number;
    gender: string;
    city: string;
    occupation: string;
  };
  health_metrics: {
    bmi: number;
    fitness_level: string;
    health_score: number;
    resting_hr: number;
    blood_pressure: string;
  };
  activity_summary: {
    weekly_steps: number;
    daily_avg_steps: number;
    weekly_calories: number;
    exercise_sessions: number;
    workout_types: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  insurer?: {
    id: string;
    name: string;
    logo: string;
  };
  hasConsented: boolean;
  isOnboarded: boolean;
  activityConnected: boolean;
  createdAt: string;
}

export interface Insurer {
  id: string;
  name: string;
  logo: string;
}

export interface BonusProgram {
  name: string;
  description: string;
  requirement: {
    stepsPerDay: number;
    daysRequired: number;
    periodDays: number;
  };
  reward: string;
}

export interface ActivityData {
  date: string;
  steps: number;
  calories: number;
  distance: number;
  activeMinutes: number;
}

export interface League {
  id: string;
  name: string;
  code: string;
  members: Array<{
    id: string;
    name: string;
    totalSteps: number;
    streak: number;
    bonusProgress: number;
  }>;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt: string;
}
