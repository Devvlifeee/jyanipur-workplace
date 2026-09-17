'use client';

import { useState, useRef, useEffect } from 'react';
import { KeyRound, UserCog, Sliders, Shield, LogOut } from 'lucide-react';
import Link from 'next/link';

interface ProfileDropdownProps {
  email: string;
}

export default function ProfileDropdown({ email }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamically extract the first letter of the email (e.g., 'g' from 'gst@...')
  const initial = email ? email.charAt(0).toUpperCase() : 'U';

  // Close dropdown when clicking outside
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
    // Clear client-side local storage
    localStorage.removeItem('jyanipur_user_email');
    
    // Trigger the server logout route to handle httpOnly/secure cookies and redirect safely
    window.location.href = '/api/auth/logout';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dynamic Initial Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        {initial}
      </button>

      {/* Popover Menu */}
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
              className="w-full px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition text-blue-600 font-medium cursor-pointer"
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