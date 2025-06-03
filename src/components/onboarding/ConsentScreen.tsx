
import React, { useState } from 'react';
import { Shield, Check, Eye, Lock, Share } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ConsentScreenProps {
  onConsentGiven: () => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({ onConsentGiven }) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  const privacyPoints = [
    {
      icon: Eye,
      title: 'Data Transparency',
      description: 'You control what data is shared with your insurer'
    },
    {
      icon: Lock,
      title: 'Secure Storage',
      description: 'Your activity data is encrypted and securely stored'
    },
    {
      icon: Share,
      title: 'Limited Sharing',
      description: 'Only aggregated step counts are shared for bonus qualification'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Privacy & Consent
          </h1>
          <p className="text-gray-600">
            Your privacy is important. Here's what you're agreeing to:
          </p>
        </div>

        {/* Privacy Points */}
        <div className="space-y-4 mb-8">
          {privacyPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Data Sharing Summary */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">What We Share</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Daily step counts (aggregated)</li>
            <li>• Bonus program qualification status</li>
            <li>• No personal location or health data</li>
          </ul>
        </Card>

        {/* Consent Checkbox */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                hasAgreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {hasAgreed && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
            <div className="text-sm text-gray-700">
              I agree to the data processing as described above and accept the{' '}
              <button className="text-blue-600 underline">Terms of Service</button> and{' '}
              <button className="text-blue-600 underline">Privacy Policy</button>
            </div>
          </label>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onConsentGiven}
          disabled={!hasAgreed}
          className="w-full h-12 font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
