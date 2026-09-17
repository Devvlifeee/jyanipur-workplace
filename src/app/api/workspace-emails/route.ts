import { NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function GET() {
  try {
    const workspaceEmails = await db.workspaceEmail.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: workspaceEmails }, { status: 200 });
  } catch (error: any) {
    console.error('GET Workspace Emails Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, forwardTo, sendCredentials } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ success: false, error: 'First name, last name, and email are required.' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await db.workspaceEmail.findFirst({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: 'This email address already exists in the directory.' }, { status: 400 });
    }

    // Generate a secure temporary password
    const tempPassword = crypto.randomBytes(4).toString('hex') + '@Jp1!';

    console.log('Creating database record...');
    const newEmail = await db.workspaceEmail.create({
      data: {
        email,
        password: tempPassword, // <-- Save the password in the database
        forwardTo: forwardTo || null,
      },
    });

    if (sendCredentials) {
      try {
        await transporter.sendMail({
          from: `"Jyanipur Enterprise Admin" <support@jyanipur.com>`,
          to: forwardTo || email,
          subject: 'Your Jyanipur Workspace Credentials',
          text: `Hello ${firstName},\n\nYour workspace account has been provisioned successfully.\n\nEmail: ${email}\nTemporary Password: ${tempPassword}\n\nPlease sign in and update your password immediately.`,
        });
      } catch (smtpErr) {
        console.error('SMTP Error (Non-fatal for DB creation):', smtpErr);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: { ...newEmail, tempPassword, firstName, lastName, status: 'Active' } 
    }, { status: 201 });

  } catch (error: any) {
    console.error('POST Workspace Email Fatal Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    await db.workspaceEmail.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}