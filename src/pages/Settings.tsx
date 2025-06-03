
import React from 'react';
import { ChevronRight, Shield, Building, LogOut, User } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Navigation } from '../components/layout/Navigation';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApp } from '../contexts/AppContext';

export const Settings: React.FC = () => {
  const { user, setUser } = useApp();

  const handleLogout = () => {
    setUser(null);
    // TODO: Clear all user data and redirect to welcome screen
    console.log('User logged out');
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: 'Update your personal information',
          onClick: () => console.log('Open profile settings')
        },
        {
          icon: Building,
          label: 'Health Insurance',
          description: user?.insurer?.name || 'Not selected',
          onClick: () => console.log('Change insurer')
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          label: 'Data & Privacy',
          description: 'Manage your data sharing preferences',
          onClick: () => console.log('Open privacy settings')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Settings" showNotifications={false} />
      
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* User info card */}
        {user && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  {user.insurer && (
                    <p className="text-sm text-blue-600 mt-1">
                      {user.insurer.logo} {user.insurer.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings sections */}
        {settingsSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
              {section.title}
            </h3>
            <Card>
              <CardContent className="p-0">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        index !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout button */}
        <Card>
          <CardContent className="p-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App info */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>BewegungsLiga+ v1.0.0</p>
          <p className="mt-1">Made for better health & fitness</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
};
