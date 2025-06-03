// src/components/ResponsiveDashboard.tsx
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { FaMedal, FaFlagCheckered } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const { user } = useApp();
  const insurer = user?.insurer;
  const bonus = insurer?.bonusProgram;

  // Example challenge data (replace with real data if available)
  const challenges = [
    { id: 1, name: '10k Steps Challenge', progress: 80, goal: 100, joined: true },
    { id: 2, name: '5-Day Streak', progress: 3, goal: 5, joined: false },
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Bonus Programme Card */}
      {bonus && (
        <Card className="bg-gradient-to-br from-green-200 to-green-100 shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="flex items-center w-full justify-between mb-2">
              <span className="font-semibold text-lg text-green-900">Bonus Programme</span>
              <FaMedal className="text-2xl text-green-600" />
            </div>
            <div className="text-xl font-bold text-green-800 mb-1">{bonus.name}</div>
            <div className="text-sm text-green-700 mb-2">{bonus.description}</div>
            <div className="w-full bg-green-300 rounded-full h-2 mb-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `80%` }} // TODO: calculate real progress
              />
            </div>
            <div className="w-full flex justify-between text-xs text-green-900">
              <span>Requirement: {bonus.requirement.stepsPerDay.toLocaleString()} steps/day</span>
              <span>Reward: {bonus.reward}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Challenges Card */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <FaFlagCheckered className="text-xl text-blue-500 mr-2" />
            <span className="font-semibold text-lg text-blue-900">Challenges</span>
          </div>
          <div className="space-y-4">
            {challenges.map((ch) => (
              <div key={ch.id} className="flex flex-col bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-blue-800">{ch.name}</span>
                  {ch.joined ? (
                    <span className="text-xs text-green-600 font-semibold">Joined</span>
                  ) : (
                    <button className="text-xs text-blue-600 underline">Join</button>
                  )}
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(ch.progress / ch.goal) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-blue-700">{ch.progress} / {ch.goal}</div>
                {ch.joined && ch.progress >= ch.goal && (
                  <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs font-semibold">Claim Reward</button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;