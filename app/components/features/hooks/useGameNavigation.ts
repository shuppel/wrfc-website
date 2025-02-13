import { useCallback } from 'react';

export const useGameNavigation = () => {
  const handleNavigateToMenu = useCallback(() => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      window.location.href = '/playground';
    }
  }, []);

  return {
    handleNavigateToMenu,
    handleExit: handleNavigateToMenu
  };
}; 