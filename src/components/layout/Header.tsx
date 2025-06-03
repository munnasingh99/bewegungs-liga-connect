
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showNotifications = true }) => {
  const { user } = useApp();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 safe-area-pt">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {showNotifications && (
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
          )}
          
          {user && (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
