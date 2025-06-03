import React from 'react';
import Dashboard from '@/components/Dashboard';

const DashboardPage: React.FC = () => {
  // Use a valid test user ID from your CSV data
  const testUserId = "USR001";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard userId={testUserId} />
      </div>
    </div>
  );
};

export default DashboardPage; 