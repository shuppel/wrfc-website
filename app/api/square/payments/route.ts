import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// Server-side Square SDK import using ES modules
import { Client, Environment } from 'square';

// Check if Square access token is available
const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN || '';

// Log environment details for debugging
console.log('Node Environment:', process.env.NODE_ENV);
console.log('Square Access Token Present:', !!squareAccessToken);

// Validate Square environment
const getSquareEnvironment = () => {
  // Explicitly check environment and return appropriate value
  if (process.env.NODE_ENV === 'production') {
    console.log('Using Square Production Environment');
    return Environment.Production;
  }
  
  console.log('Using Square Sandbox Environment');
  return Environment.Sandbox;
};

// Define a type for the payment parameters
interface PaymentParams {
  sourceId: string;
  idempotencyKey: string;
  amountMoney: {
    amount: number;
    currency: string;
  };
  locationId: string;
  note?: string;
}

// Define a type for the payment response
interface PaymentResponse {
  result: {
    payment?: {
      id?: string;
      status?: string;
    };
  };
}

// Define a type for the payments API
interface SquarePaymentsApi {
  createPayment: (params: PaymentParams) => Promise<PaymentResponse>;
}

// Safely initialize Square client
let client: Client | null = null;
let paymentsApi: SquarePaymentsApi | null = null;

try {
  // Validate access token
  if (!squareAccessToken) {
    throw new Error('Square access token is missing');
  }

  // Initialize Square client
  client = new Client({
    bearerAuthCredentials: {
      accessToken: squareAccessToken
    },
    environment: getSquareEnvironment()
  });

  // Get the payments API instance
  paymentsApi = client.paymentsApi as SquarePaymentsApi;

  console.log('Square client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Square client:', error);
  client = null;
  paymentsApi = null;
}

/**
 * Server-side API route handler for processing Square payments
 * This handles all payment processing logic
 */
export async function POST(request: Request) {
  console.log('Payment API route called');
  
  // Check if Square client is initialized
  if (!client || !paymentsApi) {
    console.error('Square client not properly initialized');
    return NextResponse.json({
      success: false,
      error: 'Payment service is not properly configured'
    }, { status: 500 });
  }

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