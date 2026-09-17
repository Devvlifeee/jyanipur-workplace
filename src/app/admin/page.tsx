'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Plus, Trash2 } from 'lucide-react';

interface WorkspaceEmailItem {
  id: string;
  email: string;
  forwardTo?: string;
  createdAt: string;
}

export default function AdminEmailsPage() {
  const [emails, setEmails] = useState<WorkspaceEmailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedPasswords, setRevealedPasswords] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/workspace-emails');
      const data = await res.json();
      if (data.success) {
        setEmails(data.data);
      }
    } catch (err) {
      console.error('Failed to load records', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mail routing rule?')) return;
    try {
      const res = await fetch(`/api/workspace-emails?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchEmails();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-8 bg-white min-h-screen text-[#09090B]">
      
      {/* Seamless Header - No awkward underline */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090B]">Workspace Mail Routing</h1>
          <p className="text-sm text-[#71717A] mt-1">Configure domain mailboxes, aliases, and external forwarding rules.</p>
        </div>
        <div>
          <Link
            href="/admin/emails/new"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] transition shadow-sm"
          >
            <Plus className="w-5 h-5" /> Add routing rule
          </Link>
        </div>
      </div>

      {/* Flat List */}
      {loading ? (
        <div className="py-16 text-center text-sm text-[#71717A]">Loading mail routes...</div>
      ) : emails.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <Mail className="w-12 h-12 mx-auto text-[#A1A1AA] stroke-[1.5]" />
          <p className="text-base font-semibold text-[#09090B]">No mail routes configured</p>
          <p className="text-sm text-[#71717A]">Click "Add routing rule" above to map custom domain mailboxes.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#E4E4E7]">
          {emails.map((item) => (
            <div key={item.id} className="py-6 flex items-center justify-between hover:bg-[#FAFAFA] px-4 transition">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center font-bold text-base">
                  {item.email.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold text-[#09090B]">{item.email}</p>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#71717A] mt-1">
                    {item.forwardTo ? `Forwarding to: ${item.forwardTo}` : 'Managed Mailbox'} • Temp Key: <code className="bg-[#F4F4F5] px-1.5 py-0.5 rounded text-[#09090B] font-mono">{revealedPasswords[item.email] || '••••••••'}</code>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const pass = prompt(`Enter new temporary password for ${item.email}:`);
                    if (pass) setRevealedPasswords(prev => ({ ...prev, [item.email]: pass }));
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#3F3F46] hover:bg-[#F4F4F5] transition"
                >
                  Manage Keys
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2.5 rounded-xl text-[#71717A] hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete Route"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}