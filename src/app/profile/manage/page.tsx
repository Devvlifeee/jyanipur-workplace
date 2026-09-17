'use client';

import { useState, useEffect } from 'react';
import { Home, User, Shield, Key, Link2, Lock, Users } from 'lucide-react';

export default function ManageAccountPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState({ email: 'Loading...', name: 'Loading...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      const email = localStorage.getItem('jyanipur_user_email');
      if (!email) {
        window.location.href = '/login';
        return;
      }

      try {
        // Fetch real-time data from database API route
        const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.user) {
          setUserData(data.user);
        }
      } catch (e) {
        console.error('Failed to fetch user from DB', e);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading) return <div className="p-10">Loading profile from database...</div>;

  const initial = userData.name.charAt(0);

  return (
    <div className="flex flex-1 min-h-full bg-white text-gray-800">
      {/* Sidebar & Profile UI */}
      <aside className="w-72 border-r border-gray-200 py-6 px-3 space-y-1 flex-shrink-0">
        <div className="px-4 pb-3 mb-2 border-b border-gray-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-xs">
            {initial}
          </div>
          <span className="text-sm font-medium text-gray-700">Jyanipur <span className="font-normal text-gray-400">Account</span></span>
        </div>
      </aside>

      <main className="flex-1 p-10 max-w-4xl">
        <div className="text-center space-y-4 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-bold text-2xl mx-auto flex items-center justify-center shadow-inner">
            {initial}
          </div>
          <h1 className="text-2xl font-normal text-gray-900">{userData.name}</h1>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </main>
    </div>
  );
}