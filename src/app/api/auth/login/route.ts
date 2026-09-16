import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // For secure password checking
import jwt from 'jsonwebtoken'; // For signing session tokens

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

    // 2. TODO: Fetch user from your database (e.g., Prisma / MongoDB)
    // const user = await db.user.findUnique({ where: { email } });
    // if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    // 3. Verify password hash (simulated here)
    // const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    // if (!isValidPassword) return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });

    // 4. Generate a secure JSON Web Token (JWT) session
    const token = jwt.sign({ email, domain: email.split('@')[1] }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // 5. Create the response and set a secure HTTP-only cookie
    const response = NextResponse.json({ success: true, redirectUrl: '/' }, { status: 200 });
    
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