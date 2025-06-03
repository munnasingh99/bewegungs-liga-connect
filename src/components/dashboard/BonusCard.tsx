
import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

interface BonusCardProps {
  daysAchieved: number;
  daysRequired: number;
  progressPercentage: number;
  isEligible: boolean;
  reward: string;
  onClaimBonus: () => void;
}

export const BonusCard: React.FC<BonusCardProps> = ({
  daysAchieved,
  daysRequired,
  progressPercentage,
  isEligible,
  reward,
  onClaimBonus
}) => {
  return (
    <Card className={isEligible ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Bonus Progress</span>
          <Award className={`w-6 h-6 ${isEligible ? 'text-green-600' : 'text-gray-400'}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress overview */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-1 text-gray-900">
            {daysAchieved} / {daysRequired}
          </div>
          <div className="flex items-center justify-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            Days completed this month
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress 
            value={progressPercentage} 
            className={`h-3 ${isEligible ? 'bg-green-200' : 'bg-gray-200'}`}
          />
          <div className="text-center text-sm text-gray-600">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>

        {/* Reward info */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800 font-medium">Reward</div>
          <div className="text-blue-900 font-semibold">{reward}</div>
        </div>

        {/* Action button */}
        {isEligible ? (
          <Button 
            onClick={onClaimBonus}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            🎉 Claim Your Bonus
          </Button>
        ) : (
          <div className="text-center text-sm text-gray-500">
            {daysRequired - daysAchieved} more days to qualify
          </div>
        )}
      </CardContent>
    </Card>
  );
};
