'use client';

import React, { useState } from 'react';
import { KeyRound, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function JpMassiveLogo() {
  return (
    <div className="flex items-center justify-center select-none">
      <div className="relative w-96 h-96 md:w-[420px] md:h-[420px] flex items-center justify-center flex-shrink-0">
        <svg width="420" height="420" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 18.5 10 C 18.5 4, 14 2, 10 3" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 4 10 H 22" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 18.5 16.5 H 9 C 16 23.5, 4 32.5, 1.5 17" stroke="#115E59" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 18.5 10 V 36 M 14 36 H 23" stroke="#C2410C" strokeWidth="3.4" strokeLinecap="square" />
          <path d="M 18.5 10 H 24 C 29.5 10 33 13 33 16.5 C 33 20 29.5 23 24 23 H 18.5" stroke="#041E49" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Database-backed Magic Link login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Workspace account not found or inactive.');
      }

      setSuccessMessage('Magic link sent successfully! Please check your email inbox to sign in.');
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the magic link.');
    } finally {
      setLoading(false);
    }
  };

  const handleDevBypass = () => {
    const adminEmail = 'admin@jyanipur.com';
    setEmail(adminEmail);
    localStorage.setItem('jyanipur_user_email', adminEmail);
    document.cookie = "jyanipur_session=dev_bypass_token; path=/; max-age=86400";
    router.push('/admin/emails');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left Side: Massive Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-white flex-col items-center justify-center p-12 border-r border-slate-100">
        <JpMassiveLogo />
      </div>

      {/* Right Side: Login Form Details */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-start">
          
          <div className="lg:hidden mb-6 self-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M 18.5 10 C 18.5 4, 14 2, 10 3" stroke="#D97706" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 4 10 H 22" stroke="#262626" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 18.5 16.5 H 9 C 16 23.5, 4 32.5, 1.5 17" stroke="#115E59" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 18.5 10 V 36 M 14 36 H 23" stroke="#C2410C" strokeWidth="3.4" strokeLinecap="square" />
                <path d="M 18.5 10 H 24 C 29.5 10 33 13 33 16.5 C 33 20 29.5 23 24 23 H 18.5" stroke="#041E49" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Sign in to Jyanipur</h1>
          <p className="text-xs text-slate-500 mb-6">
            Enter your database-registered workspace email to receive a secure sign-in link.
          </p>

          {/* Database Error Alert */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="w-full mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Work Email
              </label>
              <input 
                type="email" 
                placeholder="name@jyanipur.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all"
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-11 bg-[#041E49] hover:bg-blue-950 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              <span>{loading ? 'Sending Magic Link...' : 'Send Magic Link'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative w-full my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider"><span className="bg-white px-3 text-slate-400 font-medium">Or</span></div>
          </div>

          <button 
            type="button"
            className="w-full h-11 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-sm border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <KeyRound className="w-4 h-4 text-slate-500" />
            <span>Sign in with Passkey</span>
          </button>

          {/* Development Quick Bypass Box */}
          <div className="mt-6 w-full p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-amber-900 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <p className="text-xs font-bold uppercase tracking-wide text-amber-900">Local Dev Bypass</p>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              Skip login friction and jump right into the admin panel to test your workspace email manager.
            </p>
            <button
              type="button"
              onClick={handleDevBypass}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Quick Login as admin@jyanipur.com</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-8 text-center w-full">
            Secure enterprise authentication powered by Jyanipur Identity.
          </p>
        </div>
      </div>
    </div>
  );
}