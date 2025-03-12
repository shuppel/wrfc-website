import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// Server-side Square SDK import using ES modules
import { Client, Environment } from 'square';

// Initialize Square client once at module level
const client = new Client({
  bearerAuthCredentials: {
    accessToken: process.env.SQUARE_ACCESS_TOKEN
  },
  environment: Environment.Sandbox
});

// Get the payments API instance
const { paymentsApi } = client;

/**
 * Server-side API route handler for processing Square payments
 * This handles all payment processing logic
 */
export async function POST(request: Request) {
  console.log('Payment API route called');
  
  try {
    // 1. Environment validation
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.error('Server error: Missing Square access token');
      return NextResponse.json({
        success: false,
        error: 'Payment service is not properly configured'
      }, { status: 500 });
    }
    
    if (!process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID) {
      console.error('Server error: Missing Square location ID');
      return NextResponse.json({
        success: false,
        error: 'Payment service is not properly configured'
      }, { status: 500 });
    }

    // 2. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Invalid request body:', error);
      return NextResponse.json({
        success: false,
        error: 'Invalid request format'
      }, { status: 400 });
    }

    const { sourceId, divisionId, divisionName, amount } = body;

    // 3. Validate required fields
    if (!sourceId) {
      return NextResponse.json({
        success: false,
        error: 'Payment token is missing'
      }, { status: 400 });
    }
    
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid payment amount'
      }, { status: 400 });
    }

    // 4. Calculate final amount with fee
    const amountInCents = Math.round(amount * 103); // Including 3% fee
    
    console.log('Processing payment:', {
      amount,
      amountWithFee: amount * 1.03,
      divisionId,
      divisionName,
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
    });

    // 5. Create payment with Square API
    try {
      const paymentParams = {
        sourceId,
        idempotencyKey: randomUUID(), // Prevents duplicate payments
        amountMoney: {
          amount: amountInCents,
          currency: 'USD'
        },
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        note: `${divisionName} - ${divisionId}`
      };
      
      console.log('Calling Square payment API');
      
      const response = await paymentsApi.createPayment(paymentParams);
      
      console.log('Payment successful:', {
        id: response.result.payment?.id,
        status: response.result.payment?.status
      });

      // 6. Return success response
      return NextResponse.json({
        success: true,
        payment: response.result.payment,
        transactionId: response.result.payment?.id,
        amount: amountInCents / 100, // Convert back to dollars for display
        status: response.result.payment?.status
      });
    } catch (error) {
      // 7. Handle Square API errors
      console.error('Square API Error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        errors: error instanceof Error && 'result' in error ? (error as SquareError).result?.errors : undefined
      });

      return NextResponse.json({
        success: false,
        error: 'Payment processing failed',
        message: error instanceof Error ? error.message : 'Payment was declined or failed to process',
        details: error instanceof Error && 'result' in error 
          ? (error as SquareError).result?.errors 
          : [{ detail: 'Payment processor error' }]
      }, { status: 400 });
    }
  } catch (error) {
    // 8. Handle unexpected server errors
    console.error('Unexpected server error:', error);
    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred',
      message: 'The server encountered an error while processing your payment'
    }, { status: 500 });
  }
}

// Define a type for Square API errors
interface SquareError extends Error {
  result?: {
    errors?: Array<{
      category?: string;
      code?: string;
      detail?: string;
    }>;
  };
}