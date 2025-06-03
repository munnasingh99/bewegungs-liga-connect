import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { FaHeartbeat, FaBed, FaFire, FaDumbbell } from 'react-icons/fa';

const HealthPage: React.FC = () => {
  const { user } = useApp();
  const health = user?.health_metrics;
  const activity = user?.activity_summary;

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Health Metrics</h2>

      {/* Health Score */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <FaHeartbeat className="text-3xl text-green-500 mb-2" />
          <div className="text-lg font-semibold text-gray-700 mb-1">Health Score</div>
          <div className="text-4xl font-extrabold text-green-600">{health?.health_score ?? '--'}</div>
        </CardContent>
      </Card>

      {/* Fitness Level */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <FaDumbbell className="text-3xl text-purple-500 mb-2" />
          <div className="text-lg font-semibold text-gray-700 mb-1">Fitness Level</div>
          <div className="text-2xl font-bold text-purple-600">{health?.fitness_level ?? '--'}</div>
        </CardContent>
      </Card>

      {/* Resting Heart Rate */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <FaHeartbeat className="text-3xl text-red-400 mb-2" />
          <div className="text-lg font-semibold text-gray-700 mb-1">Resting Heart Rate</div>
          <div className="text-2xl font-bold text-red-500">{health?.resting_hr ? `${health.resting_hr} bpm` : '--'}</div>
        </CardContent>
      </Card>

      {/* Sleep */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <FaBed className="text-3xl text-blue-400 mb-2" />
          <div className="text-lg font-semibold text-gray-700 mb-1">Sleep (avg)</div>
          <div className="text-2xl font-bold text-blue-600">{activity?.weekly_calories ? `${(activity.weekly_calories/7).toFixed(1)} h` : '--'}</div>
        </CardContent>
      </Card>

      {/* Calories Burned */}
      <Card className="bg-white shadow rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center">
          <FaFire className="text-3xl text-orange-400 mb-2" />
          <div className="text-lg font-semibold text-gray-700 mb-1">Calories Burned (week)</div>
          <div className="text-2xl font-bold text-orange-600">{activity?.weekly_calories ? activity.weekly_calories.toLocaleString() : '--'} kcal</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthPage; 