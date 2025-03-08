import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard } from 'lucide-react';
import { loadSquareSdk } from '@/lib/square-utils';

interface SquarePaymentProps {
  divisionId: string;
  divisionName: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function SquarePayment({ divisionId, divisionName, amount, onSuccess, onCancel }: SquarePaymentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [paymentForm, setPaymentForm] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      initializePaymentForm();
    }
  }, [isOpen]);

  const initializePaymentForm = async () => {
    try {
      const payments = await loadSquareSdk();
      if (!payments) {
        console.error('Failed to load Square SDK');
        return;
      }

      const form = await payments.paymentForm({
        applicationId: process.env.NEXT_PUBLIC_SQUARE_APP_ID!,
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!,
        inputClass: 'sq-input',
        inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a3a3a3',
          backgroundColor: 'transparent',
        }],
        card: {
          elementId: 'sq-card',
        }
      });

      await form.build();
      setPaymentForm(form);
    } catch (error) {
      console.error('Error initializing Square payment form:', error);
      toast({
        title: 'Error',
        description: 'Failed to load payment form. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentFormSubmit = async () => {
    if (!paymentForm) return;

    setIsProcessing(true);
    try {
      const result = await paymentForm.tokenize();
      if (result.status === 'OK') {
        const response = await fetch('/api/square/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            divisionId,
            divisionName,
            amount
          }),
        });

        const data = await response.json();

        if (data.success) {
          toast({
            title: 'Payment Successful',
            description: 'Your payment has been processed. You will receive a confirmation email shortly.',
          });
          onSuccess();
          setIsOpen(false);
        } else {
          throw new Error(data.error || 'Payment failed');
        }
      } else {
        throw new Error('Card tokenization failed');
      }
    } catch (error: any) {
      toast({
        title: 'Payment Failed',
        description: error.message || 'There was an error processing your payment.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline"
        className="w-full h-auto py-4 flex items-center justify-between border-2"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-wrfc-navy" />
          <div className="text-left">
            <div className="font-semibold text-wrfc-navy">Pay with Card</div>
            <div className="text-sm text-gray-600">Secure payment via Square (+3% fee)</div>
          </div>
        </div>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Card Payment</DialogTitle>
            <DialogDescription>
              Complete your payment for {divisionName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
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

            <div id="sq-card" className={isProcessing ? 'opacity-50' : ''} />

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsOpen(false);
                  onCancel();
                }}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePaymentFormSubmit}
                disabled={isProcessing}
                className="min-w-[120px]"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 