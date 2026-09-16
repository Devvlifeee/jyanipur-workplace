'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Plus, 
  Inbox, 
  Star, 
  Clock, 
  Send, 
  FileText, 
  Bookmark, 
  SendHorizonal, 
  MailOpen, 
  AlertOctagon, 
  Trash2, 
  Users, 
  Info, 
  MessageSquare, 
  Tag, 
  Settings 
} from 'lucide-react';

export default function MailSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) => `
    flex items-center justify-between px-4 py-2 rounded-r-full text-sm font-medium transition-colors cursor-pointer
    ${isActive(path) ? 'bg-[#D3E3FD] text-[#041E49] font-bold' : 'text-slate-700 hover:bg-slate-100'}
  `;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 flex flex-col py-3 px-2 gap-1 bg-white overflow-y-auto">
      {/* New Mail Button */}
<div className="px-2 pt-1 pb-3">
  <Link 
    href="?compose=true"
    scroll={false}
    className="flex items-center justify-center gap-3 bg-[#FFEED6] hover:bg-[#ffe3bc] text-[#7A3E00] font-medium py-3 px-6 rounded-2xl shadow-xs transition-all cursor-pointer w-full border border-[#FFD9A0]"
  >
    <Plus className="w-5 h-5 text-[#D97706]" />
    <span className="text-sm font-semibold">New mail</span>
  </Link>
</div>

      {/* Shortcuts / Primary Folders */}
      <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 mt-1">Shortcuts</div>
      <nav className="flex flex-col gap-0.5">
        <Link href="/mail/inbox" className={linkClass('/mail/inbox')}>
          <div className="flex items-center gap-3">
            <Inbox className="w-4 h-4 text-slate-600" />
            <span>Inbox</span>
          </div>
          <span className="text-xs font-bold bg-[#D3E3FD] text-[#041E49] px-2 py-0.5 rounded-full">3</span>
        </Link>

        <Link href="/mail/starred" className={linkClass('/mail/starred')}>
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-slate-600" />
            <span>Starred</span>
          </div>
        </Link>

        <Link href="/mail/snoozed" className={linkClass('/mail/snoozed')}>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-600" />
            <span>Snoozed</span>
          </div>
        </Link>
      </nav>

      {/* Folders Section */}
      <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 mt-4">Folders</div>
      <nav className="flex flex-col gap-0.5">
        <Link href="/mail/sent" className={linkClass('/mail/sent')}>
          <div className="flex items-center gap-3">
            <Send className="w-4 h-4 text-slate-600" />
            <span>Sent</span>
          </div>
        </Link>

        <Link href="/mail/drafts" className={linkClass('/mail/drafts')}>
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-slate-600" />
            <span>Drafts</span>
          </div>
        </Link>

        <Link href="/mail/important" className={linkClass('/mail/important')}>
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-slate-600" />
            <span>Important</span>
          </div>
        </Link>

        <Link href="/mail/scheduled" className={linkClass('/mail/scheduled')}>
          <div className="flex items-center gap-3">
            <SendHorizonal className="w-4 h-4 text-slate-600" />
            <span>Scheduled</span>
          </div>
        </Link>

        <Link href="/mail/all" className={linkClass('/mail/all')}>
          <div className="flex items-center gap-3">
            <MailOpen className="w-4 h-4 text-slate-600" />
            <span>All Mail</span>
          </div>
        </Link>

        <Link href="/mail/spam" className={linkClass('/mail/spam')}>
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-4 h-4 text-slate-600" />
            <span>Spam</span>
          </div>
        </Link>

        <Link href="/mail/trash" className={linkClass('/mail/trash')}>
          <div className="flex items-center gap-3">
            <Trash2 className="w-4 h-4 text-slate-600" />
            <span>Bin / Trash</span>
          </div>
        </Link>
      </nav>

      {/* Categories Section */}
      <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 mt-4">Categories</div>
      <nav className="flex flex-col gap-0.5">
        <Link href="/mail/categories/social" className={linkClass('/mail/categories/social')}>
          <div className="flex items-center gap-3"><Users className="w-4 h-4 text-slate-600" /><span>Social</span></div>
        </Link>
        <Link href="/mail/categories/updates" className={linkClass('/mail/categories/updates')}>
          <div className="flex items-center gap-3"><Info className="w-4 h-4 text-slate-600" /><span>Updates</span></div>
        </Link>
        <Link href="/mail/categories/forums" className={linkClass('/mail/categories/forums')}>
          <div className="flex items-center gap-3"><MessageSquare className="w-4 h-4 text-slate-600" /><span>Forums</span></div>
        </Link>
        <Link href="/mail/categories/promotions" className={linkClass('/mail/categories/promotions')}>
          <div className="flex items-center gap-3"><Tag className="w-4 h-4 text-slate-600" /><span>Promotions</span></div>
        </Link>
      </nav>

      {/* Settings */}
      <div className="pt-2 border-t border-slate-100 mt-3 flex flex-col gap-0.5">
        <Link href="/mail/settings/labels" className={linkClass('/mail/settings/labels')}>
          <div className="flex items-center gap-3"><Settings className="w-4 h-4 text-slate-600" /><span>Settings</span></div>
        </Link>
      </div>
    </aside>
  );
}