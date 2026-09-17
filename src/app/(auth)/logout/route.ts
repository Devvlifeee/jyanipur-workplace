import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    
    // Clear session cookies
    cookieStore.set('jyanipur_session', '', { maxAge: 0, path: '/' });
    cookieStore.set('jyanipur_user_email', '', { maxAge: 0, path: '/' });

    // Use status 303 to force a GET request on redirect (fixes HTTP 405 error)
    return NextResponse.redirect(new URL('/login', request.url), 303);
  } catch (error: any) {
    console.error('Logout Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to clear session during logout.' }, { status: 500 });
  }
}