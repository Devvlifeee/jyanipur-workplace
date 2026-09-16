'use client';

import React from 'react';
import { 
  Square, 
  RotateCw, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  SlidersHorizontal,
  Inbox as InboxIcon
} from 'lucide-react';

interface MailListLayoutProps {
  title: string;
  filterOptions?: string[];
}

export default function MailListLayout({ title, filterOptions = ['From', 'Any time', 'Has attachment', 'To'] }: MailListLayoutProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Search / Filter Secondary Bar (Gmail Style) */}
      <div className="h-14 border-b border-slate-200 px-4 flex items-center gap-3 bg-white">
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.map((filter) => (
            <button 
              key={filter} 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 rounded-full transition-colors cursor-pointer border border-slate-200/60"
            >
              <span>{filter}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 rounded-full transition-colors cursor-pointer border border-slate-200/60">
            <SlidersHorizontal className="w-3 h-3 text-slate-500" />
            <span>Advanced search</span>
          </button>
        </div>
      </div>

      {/* Top Action Toolbar */}
      <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between bg-white select-none">
        <div className="flex items-center gap-3 text-slate-600">
          <button className="p-1.5 hover:bg-slate-100 rounded cursor-pointer"><Square className="w-4 h-4 text-slate-500" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded cursor-pointer" title="Refresh"><RotateCw className="w-4 h-4 text-slate-500" /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded cursor-pointer" title="More"><MoreVertical className="w-4 h-4 text-slate-500" /></button>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>No messages</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-30 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-100 rounded cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Empty State / Ready for API Data Integration */}
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-white">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <InboxIcon className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-base font-semibold text-slate-700 mb-1">Your {title} folder is empty</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Once your mail domain or API connection is configured, messages mapped to <span className="font-mono text-slate-700">/mail/{title.toLowerCase()}</span> will populate here automatically.
        </p>
      </div>
    </div>
  );
}