import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import { OnboardingFlow } from "./pages/OnboardingFlow";
import { Dashboard } from "./pages/Dashboard";
import { Activity } from "./pages/Activity";
import { Leagues } from "./pages/Leagues";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DashboardPage from '@/pages/DashboardPage';
import ResponsiveDashboard from '@/components/Dashboard';
import HealthPage from "./pages/HealthPage";
import { FaHome, FaHeartbeat } from 'react-icons/fa';

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  
  if (!user || !user.isOnboarded || !user.hasConsented || !user.activityConnected) {
    return <OnboardingFlow />;
  }
  
  return <>{children}</>;
};

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}`}
        >
          <FaHome className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium truncate">Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/health")}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-0 flex-1 ${location.pathname === "/health" ? "text-blue-600" : "text-gray-600"}`}
        >
          <FaHeartbeat className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium truncate">Health</span>
        </button>
      </div>
    </nav>
  );
};

// App content component
const AppContent: React.FC = () => {
  const { user } = useApp();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/health" element={<HealthPage />} />
        <Route
          path="/" 
          element={
            user?.isOnboarded ? 
            <Navigate to="/dashboard" replace /> : 
            <OnboardingFlow />
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leagues"
          element={
            <ProtectedRoute>
              <Leagues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TabBar />
    </Router>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
