
import React from 'react';
import { Users, Trophy, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { League } from '../../types';

interface LeagueCardProps {
  league: League;
  onViewDetails: (league: League) => void;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ league, onViewDetails }) => {
  const sortedMembers = [...league.members].sort((a, b) => b.totalSteps - a.totalSteps);
  const userRank = sortedMembers.findIndex(member => member.id === 'user-1') + 1;

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onViewDetails(league)}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{league.name}</span>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{league.members.length}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* User's position */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              #{userRank}
            </div>
            <span className="font-medium">Your position</span>
          </div>
          <div className="text-sm text-gray-600">
            {sortedMembers[userRank - 1]?.totalSteps.toLocaleString()} steps
          </div>
        </div>

        {/* Top performers */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">Leaderboard</div>
          {sortedMembers.slice(0, 3).map((member, index) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                  {index === 1 && <span className="text-gray-400 text-sm">2</span>}
                  {index === 2 && <span className="text-orange-400 text-sm">3</span>}
                </div>
                <span className="text-sm font-medium">{member.name}</span>
                {member.streak >= 7 && <Flame className="w-3 h-3 text-orange-500" />}
              </div>
              <div className="text-xs text-gray-500">
                {member.totalSteps.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
