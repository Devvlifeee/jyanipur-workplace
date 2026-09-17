import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Missing token' }, { status: 400 });
    }

    // 1. Verify token validity
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');

    // 2. Optional: Check database to ensure user still exists or is active
    // const user = await db.user.findUnique({ where: { email: decoded.email } });
    // if (!user) {
    //   return NextResponse.json({ success: false, error: 'User no longer exists.' }, { status: 404 });
    // }

    // 3. Set secure HTTP-only session cookie for 7 days
    const cookieStore = await cookies();
    cookieStore.set('jyanipur_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Also store user email if needed client-side for headers/profile syncing
    if (decoded?.email) {
      cookieStore.set('jyanipur_user_email', decoded.email, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // 4. Redirect user to their profile page or destination dashboard
    return NextResponse.redirect(new URL('/profile/manage', request.url));
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid or expired sign-in link.' }, { status: 401 });
  }
}