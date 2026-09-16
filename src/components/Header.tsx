'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Search, SlidersHorizontal, Settings } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onToggleRail: () => void;
}

export default function Header({ onToggleRail }: HeaderProps) {
  const pathname = usePathname();

  const getModuleConfig = () => {
    if (pathname.startsWith('/chat')) return { name: 'CHAT', placeholder: 'Search chat messages or spaces...' };
    if (pathname.startsWith('/erp')) return { name: 'ERP', placeholder: 'Search ERP inventory, orders, or vendors...' };
    if (pathname.startsWith('/dpr')) return { name: 'DPR', placeholder: 'Search daily progress reports...' };
    if (pathname.startsWith('/People')) return { name: 'People', placeholder: 'Search Peoples or directory...' };
    return { name: 'MAIL', placeholder: 'Search mail messages, contacts, or drafts...' };
  };

  const module = getModuleConfig();

  return (
    <header className="h-16 px-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: Menu Toggle + Unified Logo & Title */}
      <div className="flex items-center space-x-4 min-w-[260px]">
        <button
          onClick={onToggleRail}
          className="p-2.5 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl text-slate-700 transition active:scale-95"
          aria-label="Toggle navigation rail"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5">
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="Jyanipur Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#0f172a] uppercase leading-none">
            {module.name}
          </span>
        </div>
      </div>

      {/* Center: Single Universal Search Bar across all apps */}
      <div className="relative w-[560px]">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={module.placeholder}
          className="w-full bg-[#f1f5f9] hover:bg-[#e2e8f0]/60 focus:bg-white text-xs text-slate-800 pl-11 pr-10 py-2.5 rounded-full border border-transparent focus:border-[#c2410c]/40 focus:ring-2 focus:ring-[#c2410c]/10 transition outline-none placeholder-slate-400"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200/60 rounded-full text-slate-400 transition">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Global Settings & Profile */}
      <div className="flex items-center space-x-3">
        <Link
          href="/settings"
          className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>
        <div className="w-8 h-8 rounded-full bg-[#9a3412] text-white font-bold text-xs flex items-center justify-center shadow-xs">
          P
        </div>
      </div>
    </header>
  );
}