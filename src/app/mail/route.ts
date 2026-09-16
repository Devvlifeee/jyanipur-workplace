import { NextResponse } from 'next/server';

let EMAILS = [
  {
    id: '1',
    folder: 'inbox',
    sender: 'Tanvi Varma',
    email: 'tanvi.varma@jpworkplace.com',
    subject: 'Are you an fbsource ENG? We want to hear from you!',
    snippet: 'Tanvi Varma posted in On Demand FYI September 15 at 11:26 PM',
    body: 'Hi team,\n\nWe are conducting a survey for all fbsource engineers regarding developer productivity workflows. Please share your feedback on our internal portal.\n\nBest,\nTanvi',
    time: '11:27 PM',
    date: 'Sep 15, 2026',
    read: false,
    starred: false,
  },
  {
    id: '2',
    folder: 'inbox',
    sender: 'Arun Kumar R',
    email: 'arun.kumar@jpworkplace.com',
    subject: 'Change Alert 071 - Hi All, The change alert CA 071 went live on 09/15/2026.',
    snippet: 'Ensure all the teams have reviewed the change. Alert No. Impact Update Type Go Live Date Change Ite...',
    body: 'Hi All,\n\nThe change alert CA 071 went live successfully on 09/15/2026. Please verify your staging environments and report any discrepancies.\n\nRegards,\nArun Kumar R',
    time: '9:36 PM',
    date: 'Sep 15, 2026',
    read: false,
    starred: true,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || 'inbox';

  if (folder === 'starred') return NextResponse.json(EMAILS.filter(e => e.starred && e.folder !== 'trash'));
  if (folder === 'sent') return NextResponse.json(EMAILS.filter(e => e.folder === 'sent'));
  if (folder === 'trash') return NextResponse.json(EMAILS.filter(e => e.folder === 'trash'));
  if (folder === 'archive') return NextResponse.json(EMAILS.filter(e => e.folder === 'archive'));
  if (folder === 'snoozed') return NextResponse.json(EMAILS.filter(e => e.folder === 'snoozed'));

  return NextResponse.json(EMAILS.filter(e => e.folder === folder));
}

export async function POST(request: Request) {
  const body = await request.json();
  const newEmail = {
    id: Date.now().toString(),
    folder: body.folder || 'sent',
    sender: 'You (Me)',
    email: 'p@jpworkplace.com',
    subject: body.subject || '(No Subject)',
    snippet: body.body ? body.body.substring(0, 80) + '...' : '',
    body: body.body || '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: 'Today',
    read: true,
    starred: false,
  };

  EMAILS.unshift(newEmail);
  return NextResponse.json({ success: true, email: newEmail });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, updates } = body;

  EMAILS = EMAILS.map(email => {
    if (email.id === id) {
      return { ...email, ...updates };
    }
    return email;
  });

  return NextResponse.json({ success: true });
}