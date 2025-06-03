
import React from 'react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { StepsCard } from '../components/dashboard/StepsCard';
import { BonusCard } from '../components/dashboard/BonusCard';
import { StreakCard } from '../components/dashboard/StreakCard';
import { useApp } from '../contexts/AppContext';
import { calculateBonusProgress, calculateStreak, getTodaySteps, getWeeklyTotal } from '../utils/calculations';
import { toast } from '../components/ui/use-toast';

export const Dashboard: React.FC = () => {
  const { user, activityData, claimBonus } = useApp();

  if (!user || !user.insurer) {
    return <div>Loading...</div>;
  }

  const todaySteps = getTodaySteps(activityData);
  const weeklyTotal = getWeeklyTotal(activityData);
  const currentStreak = calculateStreak(activityData);
  const bonusProgress = calculateBonusProgress(activityData, user.insurer.bonusProgram);

  const handleClaimBonus = () => {
    claimBonus();
    toast({
      title: "Bonus Claimed! 🎉",
      description: `Your ${user.insurer?.bonusProgram.reward} has been submitted to ${user.insurer?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Dashboard" />
      
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Welcome message */}
        <div className="text-center py-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600">Keep up the great work with your daily activity</p>
        </div>

        {/* Main stats cards */}
        <div className="space-y-4">
          <StepsCard
            todaySteps={todaySteps}
            todayTarget={8000}
            weeklyTotal={weeklyTotal}
          />

          <div className="grid grid-cols-1 gap-4">
            <BonusCard
              daysAchieved={bonusProgress.daysAchieved}
              daysRequired={user.insurer.bonusProgram.requirement.daysRequired}
              progressPercentage={bonusProgress.progressPercentage}
              isEligible={bonusProgress.isEligible}
              reward={user.insurer.bonusProgram.reward}
              onClaimBonus={handleClaimBonus}
            />

            <StreakCard currentStreak={currentStreak} />
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              📊 View Activity
            </button>
            <button className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
              👥 Join League
            </button>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};
