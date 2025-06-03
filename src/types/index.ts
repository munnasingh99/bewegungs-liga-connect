
// Core types for BewegungsLiga+ app
export interface User {
  id: string;
  name: string;
  email: string;
  insurer: Insurer | null;
  hasConsented: boolean;
  isOnboarded: boolean;
  activityConnected: boolean;
  createdAt: string;
}

export interface Insurer {
  id: string;
  name: string;
  logo: string;
  bonusProgram: BonusProgram;
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
  target: number;
}

export interface League {
  id: string;
  name: string;
  code: string;
  members: LeagueMember[];
  createdAt: string;
}

export interface LeagueMember {
  id: string;
  name: string;
  totalSteps: number;
  streak: number;
  bonusProgress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt: string;
}
