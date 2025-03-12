// Define a type for the Square SDK
interface SquareSDK {
  payments: (appId: string, locationId: string) => unknown;
}

// Define a type for the global window object with Square
declare global {
  interface Window {
    Square?: SquareSDK;
  }
}

export const loadSquareSdk = async () => {
  // Check if Square is already loaded
  if (typeof window !== 'undefined' && 'Square' in window) {
    const square = window.Square;
    return square?.payments(
      process.env.NEXT_PUBLIC_SQUARE_APP_ID || '', 
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''
    );
  }

  try {
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.async = true;
    const loadPromise = new Promise<boolean>((resolve, reject) => {
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Square SDK'));
    });
    document.head.appendChild(script);
    await loadPromise;
    
    const square = window.Square;
    return square?.payments(
      process.env.NEXT_PUBLIC_SQUARE_APP_ID || '', 
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''
    );
  } catch (error) {
    console.error('Error loading Square SDK:', error);
    return null;
  }
}; 