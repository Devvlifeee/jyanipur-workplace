'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { 
  RefreshCw, 
  Trash2, 
  Star, 
  ArrowLeft, 
  Mail, 
  Archive, 
  Clock, 
  Reply, 
  Forward,
  CheckSquare,
  Square
} from 'lucide-react';

interface EmailItem {
  id: string;
  folder: string;
  sender: string;
  email: string;
  subject: string;
  snippet: string;
  body: string;
  time: string;
  date: string;
  read: boolean;
  starred: boolean;
}

export default function MailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentFolder = searchParams.get('folder') || 'inbox';
  
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Reply box inline state inside reader view
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const fetchEmails = async () => {
    try {
      const res = await fetch(`/api/mail?folder=${currentFolder}`);
      const data = await res.json();
      setEmails(data);
    } catch (err) {
      console.error('Failed to load emails', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchEmails();
    setSelectedEmail(null);
    setSelectedIds([]);
  }, [currentFolder]);

  // Zero-latency optimistic update for starring
  const toggleStar = async (e: React.MouseEvent, id: string, currentStarred: boolean) => {
    e.stopPropagation();
    setEmails(prev => prev.map(item => item.id === id ? { ...item, starred: !currentStarred } : item));
    if (selectedEmail?.id === id) setSelectedEmail({ ...selectedEmail, starred: !currentStarred });

    await fetch('/api/mail', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates: { starred: !currentStarred } })
    });
  };

  // Zero-latency action handler (Archive, Trash, Snooze)
  const performAction = async (id: string, targetFolder: string) => {
    setEmails(prev => prev.filter(item => item.id !== id));
    if (selectedEmail?.id === id) setSelectedEmail(null);

    await fetch('/api/mail', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates: { folder: targetFolder } })
    });
  };

  const openEmail = async (email: EmailItem) => {
    setSelectedEmail(email);
    setIsReplying(false);
    setReplyText('');
    
    if (!email.read) {
      setEmails(prev => prev.map(item => item.id === email.id ? { ...item, read: true } : item));
      await fetch('/api/mail', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: email.id, updates: { read: true } })
      });
    }
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selectedEmail) return;
    await fetch('/api/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        folder: 'sent',
        subject: `Re: ${selectedEmail.subject}`,
        body: replyText,
      })
    });
    setReplyText('');
    setIsReplying(false);
    alert('Reply sent successfully!');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
      {selectedEmail ? (
        // Email Detail Reader View with Fully Functional Actions
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
          <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedEmail(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-slate-700"
                title="Back to list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-slate-800">Back to {currentFolder}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <button onClick={() => performAction(selectedEmail.id, 'archive')} className="p-2 hover:bg-slate-200 rounded-full cursor-pointer" title="Archive">
                <Archive className="w-4 h-4" />
              </button>
              <button onClick={() => performAction(selectedEmail.id, 'trash')} className="p-2 hover:bg-slate-200 rounded-full cursor-pointer" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={() => performAction(selectedEmail.id, 'snoozed')} className="p-2 hover:bg-slate-200 rounded-full cursor-pointer" title="Snooze">
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-8 py-6 max-w-4xl w-full">
            <h1 className="text-xl font-normal text-slate-900 mb-6">{selectedEmail.subject}</h1>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  {selectedEmail.sender[0]}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{selectedEmail.sender}</div>
                  <div className="text-xs text-slate-500">&lt;{selectedEmail.email}&gt;</div>
                </div>
              </div>
              <div className="text-xs text-slate-500">{selectedEmail.date} at {selectedEmail.time}</div>
            </div>

            <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed pt-4 border-t border-slate-100 mb-8">
              {selectedEmail.body}
            </div>

            {/* Functional Reply Box */}
            {!isReplying ? (
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsReplying(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply
                </button>
              </div>
            ) : (
              <div className="border border-slate-300 rounded-xl p-4 shadow-sm bg-slate-50">
                <div className="text-xs font-bold text-slate-600 mb-2">Reply to {selectedEmail.sender}</div>
                <textarea 
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-blue-500 mb-3"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsReplying(false)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer">Cancel</button>
                  <button onClick={sendReply} className="px-4 py-1.5 text-xs bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer">Send</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Email List View
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-white text-slate-600">
            <div className="flex items-center gap-3">
              <button onClick={fetchEmails} className="p-2 hover:bg-slate-100 rounded-full cursor-pointer" title="Refresh">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-500">
              1-{emails.length} of {emails.length}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-48 text-sm text-slate-500">Loading messages...</div>
            ) : emails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-2">
                <Mail className="w-10 h-10 stroke-1" />
                <p className="text-sm">Your {currentFolder} is empty</p>
              </div>
            ) : (
              emails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => openEmail(email)}
                  className={`flex items-center px-4 py-3 border-b border-slate-100 cursor-pointer text-xs transition-colors group ${
                    email.read ? 'bg-white hover:bg-slate-50 text-slate-600' : 'bg-[#f2f6fc] hover:bg-[#e9eff9] font-bold text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 w-48 flex-shrink-0">
                    <button 
                      onClick={(e) => toggleStar(e, email.id, email.starred)}
                      className="text-slate-400 hover:text-amber-500 cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${email.starred ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>
                    <span className="truncate">{email.sender}</span>
                  </div>

                  <div className="flex-1 truncate px-4">
                    <span className="font-normal text-slate-800">{email.subject}</span>
                    <span className="text-slate-400 font-normal ml-2">— {email.snippet}</span>
                  </div>

                  {/* Quick Action Hover Icons for Zero Latency Workflow */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                    <button onClick={(e) => { e.stopPropagation(); performAction(email.id, 'archive'); }} className="p-1.5 hover:bg-slate-200 rounded-full" title="Archive">
                      <Archive className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); performAction(email.id, 'trash'); }} className="p-1.5 hover:bg-slate-200 rounded-full" title="Delete">
                      <Trash2 className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>

                  <div className="w-24 text-right flex-shrink-0 text-slate-500 font-normal">
                    {email.time}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}