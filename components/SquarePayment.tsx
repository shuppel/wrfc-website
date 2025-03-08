import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard as CreditCardIcon, ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface SquarePaymentProps {
  divisionId: string;
  divisionName: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SquarePayment({ divisionId, divisionName, amount, onSuccess, onCancel }: SquarePaymentProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Function to handle payment with retry logic
  const handlePaymentFormSubmit = async (token: any) => {
    try {
      setIsProcessing(true);
      setError(null);
      console.log('Payment token received:', token);
      
      // Set a timeout for the API call
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
        const response = await fetch('/api/square/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: token.token,
            divisionId,
            divisionName,
            amount: amount
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        console.log('Payment response:', data);

        if (data.success) {
          toast({
            title: 'Payment Successful',
            description: 'Your payment has been processed. You will receive a confirmation email shortly.',
          });
          onSuccess();
          setIsOpen(false);
          setIsProcessing(false);
        } else {
          const errorMessage = data.details?.[0]?.detail || data.error || 'Payment failed';
          throw new Error(errorMessage);
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error('Payment request timed out. Please try again.');
        }
        
        if (retryCount < 2 && (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError'))) {
          setRetryCount(prev => prev + 1);
          setError(`Network error. Retrying... (${retryCount + 1}/3)`);
          
          // Wait a bit before retrying
          setTimeout(() => handlePaymentFormSubmit(token), 2000);
          return;
        }
        
        throw fetchError;
      }
    } catch (error: any) {
      console.error('Payment Error:', error);
      setError(error.message || 'There was an error processing your payment. Please try again.');
      toast({
        title: 'Payment Failed',
        description: error.message || 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setRetryCount(0);
    setIsProcessing(false);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setIsOpen(false);
      setError(null);
      setRetryCount(0);
      if (onCancel) onCancel();
    }
  };

  return (
    <>
      <Button 
        variant="outline"
        className="w-full h-auto py-4 flex items-center justify-between border-2"
        onClick={() => setIsOpen(true)}
        disabled={isProcessing}
      >
        <div className="flex items-center gap-3">
          <CreditCardIcon className="h-5 w-5 text-wrfc-navy" />
          <div className="text-left">
            <div className="font-semibold text-wrfc-navy">Pay with Card</div>
            <div className="text-sm text-gray-600">Secure payment via Square (+3% fee)</div>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-wrfc-navy" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-[500px] w-full mx-4 relative">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              disabled={isProcessing && !error}
            >
              ×
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Card Payment</h3>
              <p className="text-gray-600">Complete your payment for {divisionName}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Amount:</span>
                <span className="text-lg font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium">Processing Fee (3%):</span>
                <span className="text-lg font-semibold text-gray-600">+${(amount * 0.03).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-bold">${(amount * 1.03).toFixed(2)}</span>
              </div>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 mb-4">{error}</p>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleRetry} 
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className={isProcessing ? 'opacity-50 pointer-events-none' : ''}>
                <PaymentForm
                  applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID!}
                  locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!}
                  cardTokenizeResponseReceived={handlePaymentFormSubmit}
                  createPaymentRequest={() => ({
                    countryCode: "US",
                    currencyCode: "USD",
                    total: {
                      amount: (amount * 1.03).toFixed(2),
                      label: divisionName,
                    },
                  })}
                >
                  <CreditCard 
                    buttonProps={{
                      css: {
                        backgroundColor: "#771520",
                        fontSize: "14px",
                        color: "#fff",
                        width: "100%",
                        marginTop: "1rem",
                        "&:hover": {
                          backgroundColor: "#530f16",
                        },
                      },
                    }}
                  />
                </PaymentForm>
              </div>
            )}

            {isProcessing && !error && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-wrfc-navy border-t-transparent"></div>
                  <p className="mt-2 text-wrfc-navy font-medium">Processing payment...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 