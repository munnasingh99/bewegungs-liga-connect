
import React from 'react';
import { ArrowRight, Activity, Users, Award } from 'lucide-react';
import { Button } from '../ui/button';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Activity,
      title: 'Track Your Steps',
      description: 'Connect your fitness tracker and monitor daily activity'
    },
    {
      icon: Users,
      title: 'Join Leagues',
      description: 'Compete with friends and family in step challenges'
    },
    {
      icon: Award,
      title: 'Earn Bonuses',
      description: 'Automatically qualify for health insurance rewards'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BewegungsLiga<span className="text-blue-600">+</span>
          </h1>
          <p className="text-lg text-gray-600">
            Stay active, connect with others, earn health insurance bonuses
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-4">
        <Button 
          onClick={onGetStarted}
          className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
