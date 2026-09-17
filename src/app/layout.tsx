'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  Menu, 
  Search, 
  SlidersHorizontal, 
  Settings, 
  HelpCircle,
  X, 
  Minus, 
  Maximize2, 
  Minimize2, 
  Send, 
  Paperclip, 
  Link2, 
  Smile, 
  Image as ImageIcon, 
  Trash2, 
  MoreVertical,
  KeyRound,
  UserCog,
  Sliders,
  Shield,
  LogOut
} from 'lucide-react';
import './globals.css';

// --- APP RAIL SVG LOGO ICONS (VERBATIM BRAND LOGOS) ---
function JPPortalRailIcon({ className = "w-6 h-6" }: { className?: string }) {
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

function JPMailRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 34V6L13.5 13.5" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 13.5L20 20" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20L26.5 13.5" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 13.5L34 6V34" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function JPChatRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 7H28C32.4183 7 36 10.5817 36 15" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M36 15V21C36 25.4183 32.4183 29 28 29" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M28 29H16L8 35V29" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 29C5.79086 29 4 27.2091 4 25V15C4 10.5817 7.58172 7 12 7" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

function JPErpRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 7V33" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 7H32" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 20H26" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M8 33H32" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

function JPPeopleRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="14" cy="11" r="4.5" stroke="#262626" strokeWidth="4" />
      <path d="M6 31C6 26.5817 9.58172 23 14 23C18.4183 23 22 26.5817 22 31" stroke="#115E59" strokeWidth="5" strokeLinecap="round" />
      <circle cx="28" cy="14" r="3.5" stroke="#C2410C" strokeWidth="3.5" />
      <path d="M23 31C23 27.6863 25.6863 25 29 25C32.3137 25 35 27.6863 35 31" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

function JPAdminRailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 5L33 12V28L20 35L7 28V12L20 5Z" stroke="#041E49" strokeWidth="3.2" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="4.5" stroke="#115E59" strokeWidth="3" />
      <path d="M20 8V11.5 M20 28.5V32 M8.5 14L11.5 16 M28.5 24L31.5 26 M8.5 26L11.5 24 M28.5 16L31.5 14" stroke="#C2410C" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

interface AppConfig {
  name: string;
  key: string;
  href: string;
  icon: React.ElementType;
  searchPlaceholder: string;
}

const APPS: AppConfig[] = [
  { name: 'Portal', key: 'portal', href: '/', icon: JPPortalRailIcon, searchPlaceholder: 'Search workplace notifications, tasks, and updates...' },
  { name: 'Mail', key: 'mail', href: '/mail/inbox', icon: JPMailRailIcon, searchPlaceholder: 'Search mail' },
  { name: 'Chat', key: 'chat', href: '/chat', icon: JPChatRailIcon, searchPlaceholder: 'Search in chat' },
  { name: 'ERP', key: 'erp', href: '/erp', icon: JPErpRailIcon, searchPlaceholder: 'Search orders, inventory, vendors...' },
  { name: 'People', key: 'people', href: '/people', icon: JPPeopleRailIcon, searchPlaceholder: 'Search staff, departments...' },
  { name: 'Admin', key: 'admin', href: '/admin', icon: JPAdminRailIcon, searchPlaceholder: 'Search admin settings, logs, accounts...' },
];

function JPPortalLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
        <svg width="64" height="64" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <path d="M 18.5 10 C 18.5 4, 14 2, 10 3" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 4 10 H 22" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 18.5 16.5 H 9 C 16 23.5, 4 32.5, 1.5 17" stroke="#115E59" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 18.5 10 V 36 M 14 36 H 23" stroke="#C2410C" strokeWidth="3.4" strokeLinecap="square" />
          <path d="M 18.5 10 H 24 C 29.5 10 33 13 33 16.5 C 33 20 29.5 23 24 23 H 18.5" stroke="#041E49" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#041E49] ml-0.5">workplace</span>
      </div>
    </div>
  );
}

function JPMailLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <path d="M6 34V6L13.5 13.5" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 13.5L20 20" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 20L26.5 13.5" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26.5 13.5L34 6V34" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#D97706] ml-0.5">mail</span>
      </div>
    </div>
  );
}

function JPChatLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <path d="M12 7H28C32.4183 7 36 10.5817 36 15" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M36 15V21C36 25.4183 32.4183 29 28 29" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M28 29H16L8 35V29" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 29C5.79086 29 4 27.2091 4 25V15C4 10.5817 7.58172 7 12 7" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#C2410C] ml-0.5">chat</span>
      </div>
    </div>
  );
}

function JPERPLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <path d="M8 7V33" stroke="#262626" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M8 7H32" stroke="#115E59" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M8 20H26" stroke="#C2410C" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M8 33H32" stroke="#D97706" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#115E59] ml-0.5">erp</span>
      </div>
    </div>
  );
}

function JPPeopleLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <circle cx="14" cy="11" r="4.5" stroke="#262626" strokeWidth="4" />
          <path d="M6 31C6 26.5817 9.58172 23 14 23C18.4183 23 22 26.5817 22 31" stroke="#115E59" strokeWidth="5" strokeLinecap="round" />
          <circle cx="28" cy="14" r="3.5" stroke="#C2410C" strokeWidth="3.5" />
          <path d="M23 31C23 27.6863 25.6863 25 29 25C32.3137 25 35 27.6863 35 31" stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#D97706] ml-0.5">people</span>
      </div>
    </div>
  );
}

function JPAdminLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-transform duration-200 group-hover:scale-105">
          <path d="M20 5L33 12V28L20 35L7 28V12L20 5Z" stroke="#041E49" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="4.5" stroke="#115E59" strokeWidth="3" />
          <path d="M20 8V11.5 M20 28.5V32 M8.5 14L11.5 16 M28.5 24L31.5 26 M8.5 26L11.5 24 M28.5 16L31.5 14" stroke="#C2410C" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      </div>
      <div className="google-sans-text text-[28px] font-normal leading-none flex items-baseline">
        <span className="text-[#1F1F1F]">JP</span>
        <span className="text-[#041E49] ml-0.5">admin</span>
      </div>
    </div>
  );
}

// Dynamic Profile Dropdown Component
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('user@jyanipur.com');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem('jyanipur_user_email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }, []);

  const initial = email ? email.charAt(0).toUpperCase() : 'U';

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    document.cookie = 'jyanipur_session=; Max-Age=0; path=/;';
    localStorage.removeItem('jyanipur_user_email');
    window.location.href = '/login';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs ml-1 hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initial}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-2 border-b border-gray-100 text-center">
            <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              🛡️ Jyanipur Enterprise Managed
            </span>
          </div>

          <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">
              {initial}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-sm text-gray-900 truncate">Workspace User</h4>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>
          </div>

          <div className="py-2 text-sm">
            <button className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition cursor-pointer">
              <KeyRound className="w-4 h-4 text-gray-500" />
              <span>Passwords and autofill</span>
            </button>

            <Link 
              href="/profile/manage" 
              onClick={() => setIsOpen(false)}
              className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition text-blue-600 font-medium"
            >
              <UserCog className="w-4 h-4 text-blue-600" />
              <span>Manage your Jyanipur Account</span>
            </Link>

            <button className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition cursor-pointer">
              <Sliders className="w-4 h-4 text-gray-500" />
              <span>Customize profile</span>
            </button>

            <button className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition border-b border-gray-100 pb-3 cursor-pointer">
              <Shield className="w-4 h-4 text-gray-500" />
              <span>Workspace security</span>
            </button>
          </div>

          <div className="pt-2 px-3">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out of all accounts
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Extracted inner component that safely uses useSearchParams()
function MainLayoutWithSearchParams({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRailOpen, setIsRailOpen] = useState(true);

  const isComposeOpen = searchParams.get('compose') === 'true';
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const isLoginPage = pathname === '/login';

  const openCompose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('compose', 'true');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsMinimized(false);
  };

  const closeCompose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('compose');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${to || 'recipient'}!`);
    setTo('');
    setSubject('');
    setBody('');
    closeCompose();
  };

  const activeApp = APPS.find((app) => {
    if (app.href === '/') return pathname === '/';
    return pathname.startsWith(`/${app.key}`);
  }) || APPS[0];

  if (isLoginPage) {
    return (
      <main className="w-screen h-screen overflow-hidden bg-white text-slate-900">
        {children}
      </main>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F6F8FC] font-sans antialiased text-slate-800 select-none relative">
      
      {/* Full-width Header Bar */}
      <header className="h-20 px-4 bg-[#F6F8FC] flex items-center justify-between flex-shrink-0 z-40 gap-4">
        <div className="flex items-center gap-3 w-80 flex-shrink-0">
          <button 
            onClick={() => setIsRailOpen(!isRailOpen)}
            className="p-2.5 text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5 stroke-[2]" />
          </button>

          <Link href={activeApp.href} className="flex items-center">
            {activeApp.key === 'portal' ? (
              <JPPortalLogo />
            ) : activeApp.key === 'mail' ? (
              <JPMailLogo />
            ) : activeApp.key === 'chat' ? (
              <JPChatLogo />
            ) : activeApp.key === 'erp' ? (
              <JPERPLogo />
            ) : activeApp.key === 'people' ? (
              <JPPeopleLogo />
            ) : activeApp.key === 'admin' ? (
              <JPAdminLogo />
            ) : (
              <JPPortalLogo />
            )}
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-600" />
            <input 
              type="text" 
              placeholder={activeApp.searchPlaceholder}
              className="w-full h-11 bg-[#EAF1FB] focus:bg-white border border-transparent focus:border-slate-300 rounded-full pl-12 pr-12 text-sm text-slate-800 placeholder-slate-500 outline-none transition-all"
            />
            <button className="absolute right-3.5 p-1.5 hover:bg-slate-200/60 rounded-full text-slate-600 cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 text-slate-600">
          <button className="p-2.5 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer" title="Help">
            <HelpCircle className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button className="p-2.5 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer" title="Settings">
            <Settings className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Dynamic Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </header>

      {/* Workspace Body Container */}
      <div className="flex-1 flex min-w-0 overflow-hidden relative">
        
        {/* App Rail */}
        <aside 
          className={`bg-[#F6F8FC] flex flex-col justify-start flex-shrink-0 transition-all duration-300 ease-in-out z-30 ${
            isRailOpen ? 'w-24 py-3' : 'w-0 py-3 overflow-hidden opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center gap-2 w-full px-2">
            <nav className="flex flex-col gap-2 w-full">
              {APPS.map((app) => {
                const Icon = app.icon;
                const isSelected = activeApp.key === app.key;

                return (
                  <Link
                    key={app.key}
                    href={app.href}
                    className={`group flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-150 ${
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

        {/* Main View Area */}
        <main 
          className="flex-1 overflow-y-auto bg-white rounded-tl-3xl border-t border-l border-slate-200/60 m-0 relative"
          onClick={(e) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.getAttribute('href') === '/mail/compose') {
              e.preventDefault();
              openCompose();
            }
          }}
        >
          {children}
        </main>
      </div>

      {/* Floating Compose Modal */}
      {isComposeOpen && (
        <div className={`absolute z-50 pointer-events-none flex items-end justify-end transition-all duration-200 ${
          isMaximized 
            ? 'inset-4 p-4 bg-black/10' 
            : 'inset-0 p-6'
        }`}>
          <div className={`pointer-events-auto bg-white rounded-t-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-200 ${
            isMaximized 
              ? 'w-full h-full max-w-5xl max-h-[85vh] rounded-b-xl' 
              : isMinimized 
                ? 'w-[300px] h-10' 
                : 'w-[540px] h-[520px]'
          }`}>
            
            <div 
              onClick={() => {
                if (isMinimized) setIsMinimized(false);
              }}
              className="bg-[#f2f6fc] px-4 py-2.5 flex items-center justify-between border-b border-slate-200 select-none cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-700">New Message</span>
              <div className="flex items-center gap-1 text-slate-600" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => {
                    setIsMinimized(!isMinimized);
                    if (isMaximized) setIsMaximized(false);
                  }} 
                  className="p-1 hover:bg-slate-200 rounded transition-colors cursor-pointer" 
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => {
                    setIsMaximized(!isMaximized);
                    if (isMinimized) setIsMinimized(false);
                  }} 
                  className="p-1 hover:bg-slate-200 rounded transition-colors cursor-pointer" 
                  title={isMaximized ? "Restore down" : "Fullscreen"}
                >
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3 h-3" />}
                </button>
                <button 
                  onClick={closeCompose} 
                  className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors cursor-pointer" 
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <form onSubmit={handleSend} className="flex flex-col flex-1 bg-white overflow-hidden">
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

                <div className="p-4 flex-1 overflow-y-auto">
                  <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full h-full outline-none resize-none text-xs text-slate-800 placeholder-slate-400 bg-transparent leading-relaxed"
                  />
                </div>

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
                      <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Attach files"><Paperclip className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert link"><Link2 className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert emoji"><Smile className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="Insert image"><ImageIcon className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-slate-600">
                    <button type="button" className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer" title="More options"><MoreVertical className="w-3.5 h-3.5" /></button>
                    <button 
                      type="button" 
                      onClick={closeCompose} 
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
      )}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading workspace...</div>}>
          <MainLayoutWithSearchParams>{children}</MainLayoutWithSearchParams>
        </Suspense>
      </body>
    </html>
  );
}