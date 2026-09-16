'use client';

import React, { useState } from 'react';

export default function EmailAdminPage() {
  const [username, setUsername] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await fetch('/api/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, forwardTo }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage(`Successfully created ${username}@yourdomain.com!`);
      setUsername('');
      setForwardTo('');
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-bold text-slate-800 mb-2">Create Workspace Email</h1>
      <p className="text-sm text-slate-500 mb-6">Provision new active email aliases for your domain instantly.</p>

      <form onSubmit={handleCreateEmail} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Username</label>
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="e.g. sarah" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 h-11 px-3 border border-slate-200 rounded-l-xl text-sm outline-none focus:border-blue-600 bg-white text-slate-800"
              required
            />
            <span className="h-11 px-4 bg-slate-100 border border-l-0 border-slate-200 rounded-r-xl text-sm text-slate-500 flex items-center">
              @yourdomain.com
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Forward Incoming Mail To</label>
          <input 
            type="email" 
            placeholder="personal-inbox@gmail.com" 
            value={forwardTo}
            onChange={(e) => setForwardTo(e.target.value)}
            className="w-full h-11 px-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-600 bg-white text-slate-800"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full h-11 bg-[#041E49] text-white font-medium rounded-xl text-sm hover:bg-blue-950 transition-colors cursor-pointer"
        >
          {loading ? 'Creating...' : 'Create Email Address'}
        </button>
      </form>

      {message && <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>}
    </div>
  );
}