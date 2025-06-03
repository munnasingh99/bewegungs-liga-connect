import React from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from '@/types';
import { API_ENDPOINTS } from '@/lib/api-config';
import { FaWalking, FaHeartbeat, FaBed } from 'react-icons/fa';

interface DashboardProps {
  userId: string;
}

const accentColors = {
  steps: '#4F8EF7',
  health: '#43D19E',
  fitness: '#A259F7',
  sleep: '#FFD166',
};

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [dashboardData, setDashboardData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

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
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</div>
        <div className="text-gray-600 mb-4">{error}</div>
        <div className="text-gray-500">Please try again later or contact support if the problem persists.</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
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
              <FaHeartbeat className="text-4xl mb-2 text-green-400" />
              <span className="text-md text-gray-500 font-medium">Health Score</span>
              <span className="text-5xl font-extrabold text-green-500 mt-1">{profile?.health_metrics.health_score}</span>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <FaWalking className="text-4xl mb-2 text-blue-500" />
              <span className="text-md text-gray-500 font-medium">Weekly Activity</span>
              <span className="text-3xl font-bold text-blue-600 mt-1">{profile?.activity_summary.weekly_steps.toLocaleString()} <span className="text-lg font-semibold">steps</span></span>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <span className="text-4xl mb-2 text-purple-500">💪</span>
              <span className="text-md text-gray-500 font-medium">Fitness Level</span>
              <span className="text-2xl font-bold text-purple-600 mt-1">{profile?.health_metrics.fitness_level}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Visualizations */}
      {dashboardData && (
        <div className="grid grid-cols-1 gap-8">
          <Card className="shadow-xl rounded-2xl border-0">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold text-blue-900">Overall Fitness Dashboard</h3>
              <p className="text-gray-500 text-sm">Visual summary of your recent health and activity</p>
            </CardHeader>
            <CardContent className="p-4">
              <Plot
                data={dashboardData.data}
                layout={{
                  ...dashboardData.layout,
                  template: "plotly_white",
                  font: {
                    family: "Inter, sans-serif",
                    size: 16,
                    color: '#22223b',
                  },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  plot_bgcolor: "rgba(0,0,0,0)",
                  margin: { t: 50, r: 30, b: 50, l: 30 },
                  legend: {
                    orientation: 'h',
                    y: -0.2,
                    x: 0.5,
                    xanchor: 'center',
                    font: { size: 14 },
                  },
                  xaxis: {
                    showgrid: false,
                    zeroline: false,
                    linecolor: '#e0e0e0',
                    tickfont: { size: 14 },
                  },
                  yaxis: {
                    showgrid: true,
                    gridcolor: '#f0f0f0',
                    zeroline: false,
                    tickfont: { size: 14 },
                  },
                  shapes: [
                    // Example: add a subtle highlight or range
                  ],
                }}
                config={{
                  responsive: true,
                  displayModeBar: false,
                }}
                className="w-full h-[420px] rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 