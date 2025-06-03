import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Insurer } from '../../types';
import { mockInsurers } from '../layout/data/mockData';

interface InsurerSelectionProps {
  onInsurerSelected: (insurer: Insurer) => void;
}

export const InsurerSelection: React.FC<InsurerSelectionProps> = ({ onInsurerSelected }) => {
  const [selectedInsurer, setSelectedInsurer] = useState<Insurer | null>(null);

  const handleContinue = () => {
    if (selectedInsurer) {
      onInsurerSelected(selectedInsurer);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <div className="flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Health Insurance
          </h1>
          <p className="text-gray-600">
            Choose your insurer to unlock personalized bonus programs
          </p>
        </div>

        {/* Insurer List */}
        <div className="space-y-3 mb-8">
          {mockInsurers.map((insurer) => (
            <Card
              key={insurer.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedInsurer?.id === insurer.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedInsurer(insurer)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{insurer.logo}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{insurer.name}</h3>
                    <p className="text-sm text-gray-600">{insurer.bonusProgram.name}</p>
                  </div>
                </div>
                
                {selectedInsurer?.id === insurer.id ? (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              {selectedInsurer?.id === insurer.id && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Bonus:</strong> {insurer.bonusProgram.reward}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Requirement: {insurer.bonusProgram.requirement.stepsPerDay.toLocaleString()} steps/day 
                    for {insurer.bonusProgram.requirement.daysRequired} days
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedInsurer}
          className="w-full h-12 font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
