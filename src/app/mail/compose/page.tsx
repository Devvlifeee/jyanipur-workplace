'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Minus, 
  Maximize2, 
  Send, 
  Paperclip, 
  Link2, 
  Smile, 
  Image as ImageIcon, 
  Trash2, 
  MoreVertical 
} from 'lucide-react';

export default function ComposePage() {
  const router = useRouter();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${to || 'recipient'}!`);
    router.back();
  };

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex items-end justify-end p-6">
      {/* Gmail-Style Floating Pop-up Box pinned to bottom right */}
      <div className={`pointer-events-auto w-[540px] bg-white rounded-t-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-200 ${
        isMinimized ? 'h-10' : 'h-[520px]'
      }`}>
        
        {/* Window Header */}
        <div 
          onClick={() => setIsMinimized(!isMinimized)}
          className="bg-[#f2f6fc] px-4 py-2.5 flex items-center justify-between border-b border-slate-200 select-none cursor-pointer"
        >
          <span className="text-xs font-bold text-slate-700">New Message</span>
          <div className="flex items-center gap-1 text-slate-600" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsMinimized(!isMinimized)} 
              className="p-1 hover:bg-slate-200 rounded transition-colors cursor-pointer" 
              title={isMinimized ? "Expand" : "Minimize"}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-200 rounded transition-colors cursor-pointer" title="Fullscreen">
              <Maximize2 className="w-3 h-3" />
            </button>
            <button 
              onClick={() => router.back()} 
              className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors cursor-pointer" 
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Compose Form Content (Hidden when minimized) */}
        {!isMinimized && (
          <form onSubmit={handleSend} className="flex flex-col flex-1 bg-white">
            {/* Recipient Input */}
            <div className="flex items-center px-4 py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-400 w-12 select-none">To</span>
              <input 
                type="email" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipients" 
                className="flex-1 outline-none text-slate-800 bg-transparent"
                required
              />
              <div className="flex gap-2 text-[11px] text-blue-600 font-medium select-none">
                <span className="cursor-pointer hover:underline">Cc</span>
                <span className="cursor-pointer hover:underline">Bcc</span>
              </div>
            </div>

            {/* Subject Input */}
            <div className="flex items-center px-4 py-2 border-b border-slate-100 text-xs">
              <span className="text-slate-400 w-12 select-none">Subject</span>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject" 
                className="flex-1 outline-none text-slate-800 bg-transparent font-medium"
              />
            </div>

            {/* Message Body Textarea */}
            <div className="p-4 flex-1">
              <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your message here..."
                className="w-full h-full outline-none resize-none text-xs text-slate-800 placeholder-slate-400 bg-transparent leading-relaxed"
              />
            </div>

            {/* Toolbar & Footer Actions */}
            <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  type="submit" 
                  className="flex items-center gap-2 bg-[#0b57d0] hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full text-xs shadow-xs transition-all cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-0.5 text-slate-600 ml-1">
                  <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Attach files">
                    <Paperclip className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert link">
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert emoji">
                    <Smile className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert image">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-slate-600">
                <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="More options">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => router.back()} 
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-500 hover:text-red-600" 
                  title="Discard draft"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}