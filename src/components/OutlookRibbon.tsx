'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Trash2, Archive, MailOpen, Flag, Reply, ReplyAll, Forward, 
  ShieldAlert, FolderInput, Search, Settings, Bell, Sparkles, Filter, RefreshCw
} from 'lucide-react';

export default function OutlookRibbon() {
  const [activeTab, setActiveTab] = useState<'home' | 'view' | 'security' | 'server'>('home');

  return (
    <header className="bg-[#0f172a] text-white flex flex-col select-none border-b border-slate-800 shadow-md shrink-0">
      {/* Top Header Row */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow">
              J
            </div>
            <span className="font-bold text-base tracking-tight text-white">Jyanipur Mail</span>
          </div>

          {/* Outlook-style Ribbon Tabs */}
          <div className="flex space-x-1 bg-slate-800/60 p-1 rounded-lg border border-slate-700/60">
            {(['home', 'view', 'security', 'server'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1 text-xs font-semibold capitalize rounded-md transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gmail-style Oval Search */}
        <div className="relative w-[480px]">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search mail, contacts, or logs (Ctrl+K)..."
            className="w-full bg-slate-800/90 text-xs text-slate-100 pl-10 pr-4 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition placeholder-slate-400"
          />
        </div>

        {/* Status Badges */}
        <div className="flex items-center space-x-3 text-slate-400 text-xs">
          <span className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>mail.jyanipur.com</span>
          </span>
          <button className="p-1.5 hover:bg-slate-800 rounded-lg transition text-slate-300"><Bell className="w-4 h-4" /></button>
          <Link href="/settings" className="p-1.5 hover:bg-slate-800 rounded-lg transition text-slate-300"><Settings className="w-4 h-4" /></Link>
        </div>
      </div>

      {/* Ribbon Action Bar */}
      <div className="h-12 px-6 bg-slate-950 flex items-center space-x-2 text-slate-300 text-xs border-b border-slate-800/60 overflow-x-auto">
        {activeTab === 'home' && (
          <>
            <Link
              href="/compose"
              className="flex items-center space-x-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition shadow-sm mr-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Mail</span>
            </Link>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 hover:text-rose-400 rounded-lg transition">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 rounded-lg transition">
              <Archive className="w-4 h-4" />
              <span>Archive</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 hover:text-amber-400 rounded-lg transition">
              <ShieldAlert className="w-4 h-4" />
              <span>Junk</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 rounded-lg transition">
              <FolderInput className="w-4 h-4" />
              <span>Move</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 hover:text-blue-400 rounded-lg transition">
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 hover:text-blue-400 rounded-lg transition">
              <ReplyAll className="w-4 h-4" />
              <span>Reply All</span>
            </button>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 hover:text-blue-400 rounded-lg transition">
              <Forward className="w-4 h-4" />
              <span>Forward</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-slate-900 text-purple-400 rounded-lg transition font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI Assist</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}