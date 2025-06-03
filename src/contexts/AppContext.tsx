import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Insurer, ActivityData, League, Achievement } from '../types';
import { mockUser, mockActivityData, mockLeagues } from '../components/layout/data/mockData';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  activityData: ActivityData[];
  leagues: League[];
  joinLeague: (code: string) => boolean;
  createLeague: (name: string) => string;
  achievements: Achievement[];
  updateInsurer: (insurer: Insurer) => void;
  updateConsent: (consented: boolean) => void;
  connectActivity: () => void;
  claimBonus: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [activityData] = useState<ActivityData[]>(mockActivityData);
  const [leagues] = useState<League[]>(mockLeagues);
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Reached your step goal 7 days in a row!',
      emoji: '🔥',
      unlockedAt: '2024-06-01'
    }
  ]);

  const joinLeague = (code: string): boolean => {
    // TODO: Implement real league joining logic
    console.log(`Joining league with code: ${code}`);
    return true;
  };

  const createLeague = (name: string): string => {
    // TODO: Implement real league creation logic
    const code = Math.random().toString(36).substring(7).toUpperCase();
    console.log(`Created league "${name}" with code: ${code}`);
    return code;
  };

  const updateInsurer = (insurer: Insurer) => {
    if (user) {
      setUser({ ...user, insurer });
    }
  };

  const updateConsent = (consented: boolean) => {
    if (user) {
      setUser({ ...user, hasConsented: consented });
    }
  };

  const connectActivity = () => {
    if (user) {
      setUser({ ...user, activityConnected: true });
    }
  };

  const claimBonus = () => {
    // TODO: Implement real bonus claiming logic
    console.log('Bonus claimed!');
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      activityData,
      leagues,
      joinLeague,
      createLeague,
      achievements,
      updateInsurer,
      updateConsent,
      connectActivity,
      claimBonus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
