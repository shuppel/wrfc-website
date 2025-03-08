import { NextResponse } from 'next/server';
const { Client } = require('square');

// Initialize Square client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});

export async function POST(request: Request) {
  try {
    const { divisionId, amount, teamData } = await request.json();

    // Create a payment link
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: `${divisionId}-${Date.now()}`,
      quickPay: {
        name: `Tournament Registration - ${teamData.teamName}`,
        priceMoney: {
          amount: amount * 100, // Convert to cents
          currency: 'USD'
        }
      },
      prePopulatedData: {
        buyerEmail: teamData.contactEmail
      },
      paymentNote: `Division: ${divisionId}, Team: ${teamData.teamName}, Contact: ${teamData.contactName}`
    });

    return NextResponse.json({
      success: true,
      paymentLink: response.result.paymentLink.url
    });
  } catch (error) {
    console.error('Square payment error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Square payment API endpoint' },
    { status: 200 }
  );
} 