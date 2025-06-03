
import { User, Insurer, ActivityData, League } from '../types';

// Mock insurers with bonus programs
export const mockInsurers: Insurer[] = [
  {
    id: 'tk',
    name: 'Techniker Krankenkasse',
    logo: '🏥',
    bonusProgram: {
      name: 'TK-Fit',
      description: 'Earn bonus points for staying active',
      requirement: {
        stepsPerDay: 8000,
        daysRequired: 20,
        periodDays: 30
      },
      reward: '€50 bonus payment'
    }
  },
  {
    id: 'aok',
    name: 'AOK',
    logo: '💚',
    bonusProgram: {
      name: 'AOK Bonus',
      description: 'Get rewarded for healthy habits',
      requirement: {
        stepsPerDay: 7500,
        daysRequired: 18,
        periodDays: 30
      },
      reward: '€40 bonus payment'
    }
  },
  {
    id: 'demo',
    name: 'Demo Insurance',
    logo: '🎯',
    bonusProgram: {
      name: 'Step Challenge',
      description: 'Demo bonus program for testing',
      requirement: {
        stepsPerDay: 6000,
        daysRequired: 15,
        periodDays: 30
      },
      reward: '€30 bonus payment'
    }
  }
];

// Mock user - TODO: Replace with real authentication
export const mockUser: User = {
  id: 'user-1',
  name: 'Max Mustermann',
  email: 'max@example.com',
  insurer: mockInsurers[0],
  hasConsented: true,
  isOnboarded: true,
  activityConnected: true,
  createdAt: '2024-05-01'
};

// Generate mock activity data for last 30 days
export const mockActivityData: ActivityData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  // Simulate realistic step counts with some variation
  const baseSteps = 6000 + Math.random() * 6000;
  const steps = Math.floor(baseSteps + (Math.sin(i * 0.3) * 2000));
  
  return {
    date: date.toISOString().split('T')[0],
    steps: Math.max(0, steps),
    target: 8000
  };
});

// Mock leagues - TODO: Replace with real data from backend
export const mockLeagues: League[] = [
  {
    id: 'league-1',
    name: 'Office Warriors',
    code: 'OFF123',
    members: [
      { id: 'user-1', name: 'Max Mustermann', totalSteps: 234567, streak: 7, bonusProgress: 85 },
      { id: 'user-2', name: 'Anna Schmidt', totalSteps: 198432, streak: 12, bonusProgress: 92 },
      { id: 'user-3', name: 'Tom Mueller', totalSteps: 156789, streak: 3, bonusProgress: 67 }
    ],
    createdAt: '2024-05-15'
  },
  {
    id: 'league-2',
    name: 'Family Steps',
    code: 'FAM456',
    members: [
      { id: 'user-1', name: 'Max Mustermann', totalSteps: 234567, streak: 7, bonusProgress: 85 },
      { id: 'user-4', name: 'Lisa Mustermann', totalSteps: 267891, streak: 14, bonusProgress: 95 }
    ],
    createdAt: '2024-05-20'
  }
];
