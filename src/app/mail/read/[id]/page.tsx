'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Archive, 
  Trash2, 
  Mail, 
  Clock, 
  Star, 
  Reply, 
  MoreVertical, 
  Printer, 
  ExternalLink 
} from 'lucide-react';

export default function EmailReadPage() {
  const router = useRouter();
  const params = useParams();
  const emailId = params.id;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Top Action Toolbar */}
      <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between bg-white select-none">
        <div className="flex items-center gap-1 text-slate-600">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer mr-2"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Archive"><Archive className="w-4 h-4 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Delete"><Trash2 className="w-4 h-4 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Mark as unread"><Mail className="w-4 h-4 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Snooze"><Clock className="w-4 h-4 text-slate-600" /></button>
        </div>

        <div className="flex items-center gap-1 text-slate-600">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Print"><Printer className="w-4 h-4 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Open in new window"><ExternalLink className="w-4 h-4 text-slate-600" /></button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="More options"><MoreVertical className="w-4 h-4 text-slate-600" /></button>
        </div>
      </div>

      {/* Email Header & Body Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Subject Header */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
            Welcome to JP Workplace & Mail Suite (Message #{emailId})
          </h1>
          <button className="text-slate-400 hover:text-amber-400 transition-colors mt-1">
            <Star className="w-5 h-5" />
          </button>
        </div>

        {/* Sender Info Card */}
        <div className="flex items-start justify-between mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm shadow-xs">
              TV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Tanvi Varma</span>
                <span className="text-xs text-slate-400">&lt;tanvi.varma@jpworkplace.com&gt;</span>
              </div>
              <div className="text-xs text-slate-500">
                to me <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-400">
            Sep 16, 2026, 12:35 AM (8 hours ago)
          </div>
        </div>

        {/* Email Body Content */}
        <div className="text-slate-800 text-sm leading-relaxed space-y-4 max-w-3xl">
          <p>Hi Team,</p>
          <p>
            Welcome to the new JP Mail interface. This structured view is ready to link up with your backend IMAP or custom API domain for seamless real-time email synchronization.
          </p>
          <p>
            All folders, shortcuts, and categories are fully operational and match standard Google Workspace patterns.
          </p>
          <p className="pt-4">
            Best regards,<br />
            <strong className="text-slate-900">Tanvi Varma</strong><br />
            <span className="text-xs text-slate-500">Engineering Operations</span>
          </p>
        </div>

        {/* Reply Action Buttons */}
        <div className="mt-12 flex items-center gap-3">
          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-full text-sm transition-colors cursor-pointer">
            <Reply className="w-4 h-4 text-slate-500" />
            <span>Reply</span>
          </button>
          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-full text-sm transition-colors cursor-pointer">
            <Reply className="w-4 h-4 text-slate-500 rotate-180" />
            <span>Forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}