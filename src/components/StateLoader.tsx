'use client';
import { useEffect } from 'react';
import { useXymyxStore } from '@/hooks/useXymyxStore';

const StateLoader: React.FC = () => {
  const { loadFromUrl } = useXymyxStore();

  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  return null;
};

export default StateLoader;
