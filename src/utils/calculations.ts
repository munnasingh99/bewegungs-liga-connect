
import { ActivityData, BonusProgram } from '../types';

// Calculate bonus progress based on activity data and insurer requirements
export const calculateBonusProgress = (
  activityData: ActivityData[],
  bonusProgram: BonusProgram
): { daysAchieved: number; progressPercentage: number; isEligible: boolean } => {
  const { stepsPerDay, daysRequired, periodDays } = bonusProgram.requirement;
  
  // Get last 30 days of data (or specified period)
  const recentData = activityData.slice(-periodDays);
  
  // Count days where target was met
  const daysAchieved = recentData.filter(day => day.steps >= stepsPerDay).length;
  
  const progressPercentage = Math.min(100, (daysAchieved / daysRequired) * 100);
  const isEligible = daysAchieved >= daysRequired;
  
  return { daysAchieved, progressPercentage, isEligible };
};

// Calculate current streak
export const calculateStreak = (activityData: ActivityData[]): number => {
  let streak = 0;
  
  // Start from the most recent day and work backwards
  for (let i = activityData.length - 1; i >= 0; i--) {
    if (activityData[i].steps >= activityData[i].target) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Get today's step count
export const getTodaySteps = (activityData: ActivityData[]): number => {
  const today = new Date().toISOString().split('T')[0];
  const todayData = activityData.find(day => day.date === today);
  return todayData?.steps || 0;
};

// Calculate weekly total
export const getWeeklyTotal = (activityData: ActivityData[]): number => {
  const lastSevenDays = activityData.slice(-7);
  return lastSevenDays.reduce((total, day) => total + day.steps, 0);
};
