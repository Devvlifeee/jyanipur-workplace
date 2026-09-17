import { NextResponse } from 'next/server';
import { db } from '@/prisma/db'; // Connects to your Neon database
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Enforce strict domain control
    if (!email || (!email.endsWith('@jyanipur.com') && !email.endsWith('@jyanipur.in'))) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized domain. Only @jyanipur.com and @jyanipur.in are allowed.' },
        { status: 403 }
      );
    }

    // 2. SECURITY CHECK: Make sure the email actually exists in your database!
    // This stops random people from typing fake emails and logging in.
    const user = await db.workspaceEmail.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: 'This email account has not been created by your workspace admin.' },
        { status: 404 }
      );
    }

    // 3. SECURITY CHECK: Verify the password matches what the admin generated
    if (user.password !== password) {
      return NextResponse.json({ success: false, message: 'Incorrect password.' }, { status: 401 });
    }

    // 4. Generate a secure JSON Web Token (JWT) session
    const token = jwt.sign({ id: user.id, email: user.email, domain: email.split('@')[1] }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // 5. Create the response and set a secure HTTP-only cookie
    const response = NextResponse.json({ success: true, redirectUrl: '/profile' }, { status: 200 });
    
    response.cookies.set({
      name: 'jyanipur_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}