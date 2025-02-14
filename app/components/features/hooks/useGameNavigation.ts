'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useGameNavigation = () => {
  const router = useRouter();

  const handleNavigateToMenu = useCallback(() => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      router.push('/games');
    }
  }, [router]);

  return {
    handleNavigateToMenu,
    handleExit: handleNavigateToMenu
  };
}; 