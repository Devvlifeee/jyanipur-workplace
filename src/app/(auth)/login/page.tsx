import React from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';

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
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      
      {/* Left Side: Just the Massive Logo on Pure White Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-white flex-col items-center justify-center p-12 border-r border-slate-100">
        <JpMassiveLogo />
      </div>

      {/* Right Side: Login Form Details */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md flex flex-col items-start">
          
          {/* Mobile-only small logo view */}
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
          <p className="text-xs text-slate-500 mb-8">
            Enter your workspace email or use a biometric passkey.
          </p>

          {/* Login Form */}
          <form className="w-full space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Work Email
              </label>
              <input 
                type="email" 
                placeholder="name@jyanipur.com"
                className="w-full h-11 px-4 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full h-11 bg-[#041E49] hover:bg-blue-950 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Continue with Email</span>
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

          <p className="text-[11px] text-slate-400 mt-12 text-center w-full">
            Secure enterprise authentication powered by Jyanipur Identity.
          </p>
        </div>
      </div>
    </div>
  );
}