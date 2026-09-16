import { NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust this import based on where your global prisma client is exported

export async function POST(request: Request) {
  try {
    const { username, forwardTo } = await request.json();
    const domain = "yourdomain.com"; // Replace with your actual domain name
    const fullEmail = `${username}@${domain}`;

    // 1. Call ImprovMX API to create the email alias programmatically
    const improvmxResponse = await fetch(`https://api.improvmx.com/v3/domains/${domain}/aliases`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${process.env.IMPROVMX_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alias: username, forward: forwardTo }),
    });

    const improvmxData = await improvmxResponse.json();

    if (!improvmxData.success) {
      return NextResponse.json({ error: 'Failed to create alias on ImprovMX' }, { status: 400 });
    }

    // 2. Save to your PostgreSQL database using your project's db client
    const newEmail = await db.workspaceEmail.create({
      data: {
        email: fullEmail,
        forwardTo,
      },
    });

    return NextResponse.json({ success: true, data: newEmail });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}