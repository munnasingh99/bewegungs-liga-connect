
import React from 'react';
import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StreakCardProps {
  currentStreak: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ currentStreak }) => {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🏆';
    if (streak >= 14) return '🔥';
    if (streak >= 7) return '💪';
    if (streak >= 3) return '⭐';
    return '🌱';
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return 'Legendary streak!';
    if (streak >= 14) return 'On fire!';
    if (streak >= 7) return 'Great momentum!';
    if (streak >= 3) return 'Building habits!';
    if (streak >= 1) return 'Getting started!';
    return 'Start your streak today!';
  };

  return (
    <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Current Streak</span>
          <Flame className="w-6 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-4xl mb-2">
          {getStreakEmoji(currentStreak)}
        </div>
        <div className="text-3xl font-bold mb-2">
          {currentStreak} days
        </div>
        <div className="text-orange-100 text-sm">
          {getStreakMessage(currentStreak)}
        </div>
      </CardContent>
    </Card>
  );
};
