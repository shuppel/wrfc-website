/*
 * This route is temporarily disabled as we're using external Square payment links instead.
 * Keeping this file as a placeholder for future direct Square integration.
 */

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Payment processing has been moved to external Square site',
    message: 'Please use the external Square payment link'
  }, { status: 307 }); // 307 Temporary Redirect
} 