'use client';

import { Button } from '@/components/ui/button';

interface ZeffyPaymentButtonProps {
  paymentLink: string;
  buttonText: string;
  className?: string;
  showZeffyInfo?: boolean;
}

export default function ZeffyPaymentButton({ 
  paymentLink, 
  buttonText, 
  className,
  showZeffyInfo = true
}: ZeffyPaymentButtonProps) {
  const handleClick = () => {
    window.open(paymentLink, '_blank');
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        className={className || "bg-wrfc-red text-white hover:bg-red-700"}
        size="lg"
      >
        {buttonText}
      </Button>
      {showZeffyInfo && (
        <p className="text-xs text-gray-600 text-center">
          Powered by Zeffy - 100% free for nonprofits
        </p>
      )}
    </div>
  );
}