'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Layers, 
  ShieldCheck, 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  // State to manage whether the Directory section is open or closed
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(true);

  const isDirectoryActive = pathname.startsWith('/admin/users') || pathname.startsWith('/admin/groups');

  return (
    <aside className="w-64 bg-white border-r border-[#DADCE0] py-4 flex flex-col h-full min-h-[calc(100vh-theme(spacing.16))] select-none">
      <div className="mb-3 px-5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368]">
          Admin control
        </h2>
      </div>

      <nav className="space-y-0.5 flex-1 px-3 text-[13px]">
        {/* Overview */}
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
            pathname === '/admin'
              ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
              : 'text-[#3C4043] hover:bg-[#F1F3F4]'
          }`}
        >
          <LayoutDashboard className={`w-4 h-4 stroke-[1.75] ${pathname === '/admin' ? 'text-[#1967D2]' : 'text-[#5F6368]'}`} />
          Overview
        </Link>

        {/* Collapsible Directory Section */}
        <div>
          <button
            onClick={() => setIsDirectoryOpen(!isDirectoryOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors ${
              isDirectoryActive && !isDirectoryOpen
                ? 'bg-[#E8F0FE] text-[#1967D2]'
                : 'text-[#3C4043] hover:bg-[#F1F3F4]'
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className="w-4 h-4 stroke-[1.75] text-[#5F6368]" />
              Directory
            </span>
            {isDirectoryOpen ? (
              <ChevronDown className="w-4 h-4 text-[#5F6368]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#5F6368]" />
            )}
          </button>

          {/* Submenu items (collapsible) */}
          {isDirectoryOpen && (
            <div className="ml-4 pl-3 border-l border-[#DADCE0] space-y-0.5 my-1">
              <Link
                href="/admin/users"
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === '/admin/users'
                    ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
                    : 'text-[#3C4043] hover:bg-[#F1F3F4]'
                }`}
              >
                Users
              </Link>
              <Link
                href="/admin/groups"
                className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  pathname === '/admin/groups'
                    ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
                    : 'text-[#3C4043] hover:bg-[#F1F3F4]'
                }`}
              >
                Groups & Teams
              </Link>
            </div>
          )}
        </div>

        {/* Workspace Emails */}
        <Link
          href="/admin/emails"
          className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
            pathname === '/admin/emails'
              ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
              : 'text-[#3C4043] hover:bg-[#F1F3F4]'
          }`}
        >
          <Mail className={`w-4 h-4 stroke-[1.75] ${pathname === '/admin/emails' ? 'text-[#1967D2]' : 'text-[#5F6368]'}`} />
          Workspace Emails
        </Link>

        {/* Access & Security */}
        <Link
          href="/admin/security"
          className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
            pathname === '/admin/security'
              ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
              : 'text-[#3C4043] hover:bg-[#F1F3F4]'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 stroke-[1.75] ${pathname === '/admin/security' ? 'text-[#1967D2]' : 'text-[#5F6368]'}`} />
          Access & Security
        </Link>

        {/* System Settings */}
        <Link
          href="/admin/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors ${
            pathname === '/admin/settings'
              ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
              : 'text-[#3C4043] hover:bg-[#F1F3F4]'
          }`}
        >
          <Settings className={`w-4 h-4 stroke-[1.75] ${pathname === '/admin/settings' ? 'text-[#1967D2]' : 'text-[#5F6368]'}`} />
          System Settings
        </Link>
      </nav>

      <div className="pt-4 border-t border-[#DADCE0] px-5">
        <p className="text-[11px] text-[#5F6368]">Jyanipur Core v2.4</p>
      </div>
    </aside>
  );
}