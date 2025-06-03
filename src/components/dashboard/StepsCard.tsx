
import React from 'react';
import { Footprints, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface StepsCardProps {
  todaySteps: number;
  todayTarget: number;
  weeklyTotal: number;
}

export const StepsCard: React.FC<StepsCardProps> = ({ 
  todaySteps, 
  todayTarget, 
  weeklyTotal 
}) => {
  const progressPercentage = Math.min(100, (todaySteps / todayTarget) * 100);
  const isTargetMet = todaySteps >= todayTarget;

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Today's Steps</span>
          <Footprints className="w-6 h-6" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main step count */}
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">
            {todaySteps.toLocaleString()}
          </div>
          <div className="flex items-center justify-center text-blue-100 text-sm">
            <Target className="w-4 h-4 mr-1" />
            Goal: {todayTarget.toLocaleString()}
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-blue-400"
          />
          <div className="flex justify-between text-sm text-blue-100">
            <span>{Math.round(progressPercentage)}% of goal</span>
            {isTargetMet && <span>🎉 Goal achieved!</span>}
          </div>
        </div>

        {/* Weekly summary */}
        <div className="pt-3 border-t border-blue-400">
          <div className="text-center">
            <div className="text-sm text-blue-100 mb-1">This Week</div>
            <div className="text-xl font-semibold">
              {weeklyTotal.toLocaleString()} steps
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
