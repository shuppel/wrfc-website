import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

// Use require to avoid TypeScript errors
const square = require('square');

// Initialize the Square client
const client = new square.Client({
  bearerAuthCredentials: {
    accessToken: process.env.SQUARE_ACCESS_TOKEN
  },
  environment: 'sandbox',
  httpClientOptions: {
    timeout: 30000, // 30 seconds
    retryConfig: {
      maxNumberOfRetries: 3,
      maximumRetryWaitTime: 10000,
    }
  }
});

const { paymentsApi } = client;

export async function POST(request: Request) {
  console.log('Payment API route called');
  
  try {
    // Validate environment variables
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.error('Missing Square access token');
      return NextResponse.json({
        success: false,
        error: 'Square access token is not configured'
      }, { status: 500 });
    }
    
    if (!process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID) {
      console.error('Missing Square location ID');
      return NextResponse.json({
        success: false,
        error: 'Square location ID is not configured'
      }, { status: 500 });
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body:', {
        ...body,
        sourceId: body.sourceId ? '***REDACTED***' : undefined
      });
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json({
        success: false,
        error: 'Invalid request body'
      }, { status: 400 });
    }

    const { sourceId, divisionId, divisionName, amount } = body;

    // Validate required fields
    if (!sourceId) {
      console.error('Missing source ID');
      return NextResponse.json({
        success: false,
        error: 'Source ID is required'
      }, { status: 400 });
    }
    
    if (!amount) {
      console.error('Missing amount');
      return NextResponse.json({
        success: false,
        error: 'Amount is required'
      }, { status: 400 });
    }

    console.log('Creating payment:', {
      amount,
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
      divisionId,
      divisionName
    });

    try {
      // Calculate the total amount with 3% fee
      const amountInCents = Math.round(amount * 103); // Including 3% fee
      
      console.log('Payment amount:', {
        original: amount,
        withFee: amount * 1.03,
        inCents: amountInCents
      });

      const paymentParams = {
        sourceId,
        idempotencyKey: randomUUID(),
        amountMoney: {
          amount: amountInCents,
          currency: 'USD'
        },
        locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        note: `${divisionName} - ${divisionId}`
      };
      
      console.log('Sending payment request to Square API');
      
      const result = await paymentsApi.createPayment(paymentParams);
      
      console.log('Payment successful:', {
        id: result.result.payment?.id,
        status: result.result.payment?.status
      });

      return NextResponse.json({
        success: true,
        payment: result.result.payment
      });

    } catch (error: any) {
      console.error('Square API Error:', {
        message: error.message,
        errors: error.errors || error.result?.errors,
        jsonErrors: JSON.stringify(error.errors || error.result?.errors || {})
      });

      return NextResponse.json({
        success: false,
        error: 'Payment processing failed',
        details: error.errors || error.result?.errors || [{ detail: error.message }]
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Unexpected server error:', {
      message: error.message,
      stack: error.stack
    });

    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred',
      message: error.message
    }, { status: 500 });
  }
}