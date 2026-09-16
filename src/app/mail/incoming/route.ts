import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Extract normalized fields from CloudMailin payload
    const sender = data.headers?.from || data.envelope?.from || 'Unknown Sender';
    const subject = data.headers?.subject || '(No Subject)';
    const body = data.plain || data.html || '';

    const incomingMessage = {
      id: Date.now().toString(),
      folder: 'inbox',
      sender,
      subject,
      snippet: body.substring(0, 80) + '...',
      body,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: 'Today',
      read: false,
      starred: false,
    };

    console.log('Successfully caught inbound email:', incomingMessage);
    // TODO: Save incomingMessage to your database / state array

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to parse incoming email webhook:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}