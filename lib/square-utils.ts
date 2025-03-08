declare global {
  interface Window {
    Square: any;
  }
}

export const loadSquareSdk = async () => {
  if (window.Square) {
    return window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
  }

  try {
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.async = true;
    const loadPromise = new Promise((resolve, reject) => {
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Failed to load Square SDK'));
    });
    document.head.appendChild(script);
    await loadPromise;
    
    return window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
  } catch (error) {
    console.error('Error loading Square SDK:', error);
    return null;
  }
}; 