
import React from 'react';
import { Calendar, TrendingUp, Target } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';

export const Activity: React.FC = () => {
  const { activityData } = useApp();

  // Get last 7 days for weekly view
  const weeklyData = activityData.slice(-7);
  const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const averageSteps = Math.round(totalSteps / weeklyData.length);
  const daysWithGoal = weeklyData.filter(day => day.steps >= day.target).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Activity" />
      
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Weekly summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {averageSteps.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Daily Average</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {daysWithGoal}/7
              </div>
              <div className="text-sm text-gray-600">Goals Met</div>
            </CardContent>
          </Card>
        </div>

        {/* Daily breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Last 7 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyData.map((day, index) => {
              const date = new Date(day.date);
              const isToday = index === weeklyData.length - 1;
              const goalMet = day.steps >= day.target;
              const progressPercentage = Math.min(100, (day.steps / day.target) * 100);

              return (
                <div key={day.date} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                        {isToday ? 'Today' : date.toLocaleDateString('en', { weekday: 'short' })}
                      </span>
                      {goalMet && <span className="text-green-600">✅</span>}
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${goalMet ? 'text-green-600' : 'text-gray-900'}`}>
                        {day.steps.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round(progressPercentage)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        goalMet ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Monthly overview */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {activityData.reduce((sum, day) => sum + day.steps, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Steps</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {activityData.filter(day => day.steps >= day.target).length}
                </div>
                <div className="text-sm text-gray-600">Goals Achieved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};
