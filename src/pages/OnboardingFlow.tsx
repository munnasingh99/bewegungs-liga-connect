
import React, { useState } from 'react';
import { WelcomeScreen } from '../components/onboarding/WelcomeScreen';
import { InsurerSelection } from '../components/onboarding/InsurerSelection';
import { ConsentScreen } from '../components/onboarding/ConsentScreen';
import { ActivityConnect } from '../components/onboarding/ActivityConnect';
import { useApp } from '../contexts/AppContext';
import { Insurer } from '../types';

export const OnboardingFlow: React.FC = () => {
  const { user, updateInsurer, updateConsent, connectActivity } = useApp();
  const [currentStep, setCurrentStep] = useState<'welcome' | 'insurer' | 'consent' | 'activity'>('welcome');

  const handleGetStarted = () => {
    setCurrentStep('insurer');
  };

  const handleInsurerSelected = (insurer: Insurer) => {
    updateInsurer(insurer);
    setCurrentStep('consent');
  };

  const handleConsentGiven = () => {
    updateConsent(true);
    setCurrentStep('activity');
  };

  const handleActivityConnected = () => {
    connectActivity();
    // TODO: Navigate to dashboard or mark onboarding complete
    window.location.href = '/dashboard';
  };

  switch (currentStep) {
    case 'welcome':
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
    case 'insurer':
      return <InsurerSelection onInsurerSelected={handleInsurerSelected} />;
    case 'consent':
      return <ConsentScreen onConsentGiven={handleConsentGiven} />;
    case 'activity':
      return <ActivityConnect onConnected={handleActivityConnected} />;
    default:
      return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }
};
