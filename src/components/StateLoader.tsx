'use client';
import { useEffect } from 'react';
import { useChessStore } from '@/hooks/useChessStore';

const StateLoader: React.FC = () => {
  const { loadFromUrl } = useChessStore();

  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  return null;
};

export default StateLoader;
