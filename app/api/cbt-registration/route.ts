import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const required = ['teamName', 'division', 'city', 'state', 'contactName', 'email', 'phone'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { status: 'error', message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Forward to Google Apps Script
    const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_URL;
    
    if (!googleScriptUrl) {
      return NextResponse.json(
        { status: 'error', message: 'Google Sheets API not configured' },
        { status: 500 }
      );
    }
    
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to process registration. Please try again or email cbt@washingtonrugby.org' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return simple status
  return NextResponse.json({ 
    status: 'ok', 
    message: 'CBT Registration API is running' 
  });
}
