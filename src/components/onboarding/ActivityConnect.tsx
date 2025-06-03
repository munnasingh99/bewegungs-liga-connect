
import React, { useState } from 'react';
import { Smartphone, Check, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ActivityConnectProps {
  onConnected: () => void;
}

export const ActivityConnect: React.FC<ActivityConnectProps> = ({ onConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // TODO: Implement real Google Health Connect / Apple HealthKit integration
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsConnecting(false);
    setIsConnected(true);
    
    // Wait a moment to show success, then continue
    setTimeout(() => {
      onConnected();
    }, 1500);
  };

  if (isConnected) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Successfully Connected!
          </h1>
          <p className="text-gray-600">
            Your activity tracker is now connected and ready to track your steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Activity Tracker
          </h1>
          <p className="text-gray-600">
            Connect your fitness tracker or smartphone to start tracking your daily steps
          </p>
        </div>

        {/* Connection Options */}
        <div className="space-y-4 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Google Health Connect</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect your Android device or fitness tracker data
              </p>
              <div className="text-xs text-gray-500">
                Supports: Google Fit, Samsung Health, Fitbit, and more
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🍎</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apple Health</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect your iPhone or Apple Watch data
              </p>
              <div className="text-xs text-gray-500">
                Coming soon for iOS devices
              </div>
            </div>
          </Card>
        </div>

        {/* Connect Button */}
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full h-12 font-semibold"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            'Connect Activity Tracker'
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Your data is kept private and only daily step counts are shared with your insurer
        </p>
      </div>
    </div>
  );
};
