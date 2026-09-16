'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  Building2, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export default function PortalDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Top Welcome Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Jyanipur Workplace Overview</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time alerts and updates across all app modules</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400">System Status</span>
          <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> All Systems Operational
          </p>
        </div>
      </div>

      {/* Grid Layout: App Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Email Updates */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-100 text-[#B35900] rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Recent Emails</h2>
            </div>
            <Link href="/mail/inbox" className="text-xs font-semibold text-[#B35900] hover:underline flex items-center gap-0.5">
              View Inbox <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="text-xs font-bold text-slate-800">DevOps Team</p>
              <p className="text-xs text-slate-600 truncate">Mailserver Deployment Status - mail.jyanipur.com</p>
              <span className="text-[10px] text-slate-400">10:42 AM</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="text-xs font-bold text-slate-800">Security Center</p>
              <p className="text-xs text-slate-600 truncate">DMARC & SPF Pass Rate Report</p>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
          </div>
        </div>

        {/* Pending Work Status / DPR */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Pending Tasks & DPR</h2>
            </div>
            <Link href="/dpr" className="text-xs font-semibold text-purple-700 hover:underline flex items-center gap-0.5">
              DPR Logs <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/50">
              <Clock className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Site A Daily Progress Report</p>
                <p className="text-xs text-slate-500">Pending engineer approval</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Gypsum Board Inspection</p>
                <p className="text-xs text-slate-500">Scheduled for today 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Alerts / ERP */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Billing & ERP Alerts</h2>
            </div>
            <Link href="/erp" className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-0.5">
              Open ERP <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-rose-50/60 rounded-xl border border-rose-200/50">
              <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-800">Vendor Payment Due</p>
                <p className="text-xs text-rose-700 font-semibold">PO #492 Outstanding Balance</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="text-xs font-bold text-slate-800">Invoice Approved</p>
              <p className="text-xs text-slate-500 truncate">Steel Procurement - Site B</p>
            </div>
          </div>
        </div>

        {/* Unread Texts / Chat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Unread Team Messages</h2>
            </div>
            <Link href="/chat" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-0.5">
              Open Chat <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">#site-coordination</p>
                <p className="text-xs text-slate-500">Satish: Updated CAD drawings are uploaded.</p>
              </div>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Harish Junnu</p>
                <p className="text-xs text-slate-500">Please verify the delivery receipt.</p>
              </div>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">1</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}