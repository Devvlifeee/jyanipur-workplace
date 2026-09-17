import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }

    // Check if the workspace email exists in your database
    const user = await db.workspaceEmail.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      return NextResponse.json({ success: false, error: 'Workspace account not found or inactive.' }, { status: 404 });
    }

    // Generate a short-lived login token (valid for 15 minutes)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '15m' }
    );

    const loginLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/verify?token=${token}`;

    // Send the magic link via Brevo SMTP
    await transporter.sendMail({
      from: `"Jyanipur Workspace Auth" <support@jyanipur.com>`,
      to: user.forwardTo || email,
      subject: 'Sign in to Jyanipur Workspace',
      text: `Hello,\n\nClick the secure link below to sign in instantly to your Jyanipur Workspace (${email}):\n\n${loginLink}\n\nThis link expires in 15 minutes. If you did not request this, please ignore this email.`,
    });

    return NextResponse.json({ success: true, message: 'Magic link sent successfully!' });
  } catch (error: any) {
    console.error('Magic Link Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}