'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// --- APP RAIL SVG LOGOS (EXACT HEADER LOGO SVGS) ---

export function JPPortalRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 18.5 10 C 18.5 4, 14 2, 10 3" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 4 10 H 22" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 18.5 16.5 H 9 C 16 23.5, 4 32.5, 1.5 17" stroke="#115E59" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 18.5 10 V 36 M 14 36 H 23" stroke="#C2410C" strokeWidth="3.4" strokeLinecap="square" />
      <path d="M 18.5 10 H 24 C 29.5 10 33 13 33 16.5 C 33 20 29.5 23 24 23 H 18.5" stroke="#041E49" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function JPMailRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 34V6L13.5 13.5" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 13.5L20 20" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20L26.5 13.5" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 13.5L34 6V34" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function JPChatRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 7H28C32.4183 7 36 10.5817 36 15" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M36 15V21C36 25.4183 32.4183 29 28 29" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M28 29H16L8 35V29" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 29C5.79086 29 4 27.2091 4 25V15C4 10.5817 7.58172 7 12 7" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

export function JPErpRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 7V33" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 7H32" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 20H26" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 33H32" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

export function JPPeopleRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="11" r="4.5" stroke="#262626" strokeWidth="4" />
      <path d="M6 31C6 26.5817 9.58172 23 14 23C18.4183 23 22 26.5817 22 31" stroke="#115E59" strokeWidth="5" strokeLinecap="round" />
      <circle cx="28" cy="14" r="3.5" stroke="#C2410C" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M23 31C23 27.6863 25.6863 25 29 25C32.3137 25 35 27.6863 35 31" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export interface AppConfig {
  name: string;
  key: string;
  href: string;
  icon: React.ElementType;
}

export const APPS: AppConfig[] = [
  { name: 'Portal', key: 'portal', href: '/', icon: JPPortalRailIcon },
  { name: 'Mail', key: 'mail', href: '/mail/inbox', icon: JPMailRailIcon },
  { name: 'Chat', key: 'chat', href: '/chat', icon: JPChatRailIcon },
  { name: 'ERP', key: 'erp', href: '/erp', icon: JPErpRailIcon },
  { name: 'People', key: 'people', href: '/People', icon: JPPeopleRailIcon },
];

interface AppRailProps {
  isOpen: boolean;
}

export default function AppRail({ isOpen }: AppRailProps) {
  const pathname = usePathname();

  const activeApp = APPS.find((app) => {
    if (app.href === '/') return pathname === '/';
    return pathname.startsWith(`/${app.key}`);
  }) || APPS[0];

  return (
    <aside
      className={`bg-[#F6F8FC] flex flex-col justify-start flex-shrink-0 transition-all duration-300 ease-in-out z-30 ${
        isOpen ? 'w-18 py-2' : 'w-0 py-2 overflow-hidden opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-1.5 w-full px-1.5">
        <nav className="flex flex-col gap-1.5 w-full">
          {APPS.map((app) => {
            const Icon = app.icon;
            const isSelected = activeApp.key === app.key;

            return (
              <Link
                key={app.key}
                href={app.href}
                className={`group flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#D3E3FD] text-[#041E49] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-150 ${
                  isSelected ? 'scale-105' : 'group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <span className={`text-[11px] font-medium mt-1 tracking-tight ${
                  isSelected ? 'font-bold text-[#041E49]' : 'text-slate-600'
                }`}>
                  {app.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}