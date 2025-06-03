// src/components/ResponsiveDashboard.tsx
import React from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from '@/types';
import { API_ENDPOINTS } from '@/lib/api-config';
import { useIsMobile } from '@/hooks/use-mobile';

// Import your existing mobile components
import { StepsCard } from './dashboard/StepsCard';
import { BonusCard } from './dashboard/BonusCard';
import { StreakCard } from './dashboard/StreakCard';

interface ResponsiveDashboardProps {
  userId: string;
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({ userId }) => {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [dashboardData, setDashboardData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      setError(null);
      try {
        const response = await fetch(API_ENDPOINTS.userDashboard(userId));
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.detail || 'Failed to fetch dashboard data');
        }
        const data = await response.json();
        setProfile(data.profile);
        setDashboardData(data.dashboard);
      } catch (error: any) {
        const errorMessage = error.message || 'Failed to load dashboard data';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [userId, toast]);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-4">
        <div className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</div>
        <div className="text-gray-600 mb-4 text-center">{error}</div>
        <div className="text-gray-500 text-center">Please try again later or contact support if the problem persists.</div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4 space-y-6 max-w-md mx-auto">
          {/* Welcome message */}
          <div className="text-center py-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Welcome back, {profile?.basic_info.name}! 👋
            </h2>
            <p className="text-gray-600">Keep up the great work with your daily activity</p>
          </div>

          {/* Main stats cards */}
          <div className="space-y-4">
            <StepsCard
              todaySteps={Math.floor(profile?.activity_summary.daily_avg_steps || 0)}
              todayTarget={8000}
              weeklyTotal={profile?.activity_summary.weekly_steps || 0}
            />

            <div className="grid grid-cols-1 gap-4">
              <BonusCard
                daysAchieved={23}
                daysRequired={20}
                progressPercentage={100}
                isEligible={true}
                reward="€50 bonus payment"
                onClaimBonus={() => toast({ title: "Bonus Claimed! 🎉" })}
              />

              <StreakCard currentStreak={7} />
            </div>
          </div>

          {/* Simplified metrics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Health Overview</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {profile?.health_metrics.health_score}
                  </div>
                  <div className="text-sm text-gray-600">Health Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile?.health_metrics.fitness_level}
                  </div>
                  <div className="text-sm text-gray-600">Fitness Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* User Profile Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl rounded-2xl border-0">
        <CardHeader className="pb-2">
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">
            {profile?.basic_info.name}'s Fitness Dashboard
          </h2>
          <p className="text-gray-500 text-base mt-1">Personalized health & activity summary</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <span className="text-4xl mb-2">💚</span>
              <span className="text-md text-gray-500 font-medium">Health Score</span>
              <span className="text-5xl font-extrabold text-green-500 mt-1">{profile?.health_metrics.health_score}</span>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <span className="text-4xl mb-2">🏃</span>
              <span className="text-md text-gray-500 font-medium">Weekly Activity</span>
              <span className="text-3xl font-bold text-blue-600 mt-1">{profile?.activity_summary.weekly_steps.toLocaleString()} <span className="text-lg font-semibold">steps</span></span>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <span className="text-4xl mb-2">💪</span>
              <span className="text-md text-gray-500 font-medium">Fitness Level</span>
              <span className="text-2xl font-bold text-purple-600 mt-1">{profile?.health_metrics.fitness_level}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Visualizations */}
      {dashboardData && (
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="pb-2">
            <h3 className="text-xl font-bold text-blue-900">Detailed Analytics</h3>
            <p className="text-gray-500 text-sm">Comprehensive view of your health and activity data</p>
          </CardHeader>
          <CardContent className="p-4">
            <Plot
              data={dashboardData.data}
              layout={{
                ...dashboardData.layout,
                autosize: true,
                responsive: true,
                template: "plotly_white",
                font: {
                  family: "Inter, sans-serif",
                  size: 14,
                  color: '#22223b',
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                margin: { t: 60, r: 30, b: 50, l: 60 },
              }}
              config={{
                responsive: true,
                displayModeBar: false,
              }}
              className="w-full"
              useResizeHandler={true}
              style={{ width: '100%', height: '600px' }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResponsiveDashboard;