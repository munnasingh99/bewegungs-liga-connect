// src/components/layout/ConditionalNavigation.tsx
import React from 'react';
import { Navigation } from './Navigation';
import { useIsMobile } from '@/hooks/use-mobile';

export const ConditionalNavigation: React.FC = () => {
  const isMobile = useIsMobile();
  
  return isMobile ? <Navigation /> : null;
};