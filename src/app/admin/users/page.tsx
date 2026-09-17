'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Shield, Trash2 } from 'lucide-react';

interface UserItem {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/workspace-emails');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/workspace-emails?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchUsers();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-8 bg-white min-h-screen text-[#09090B]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E4E4E7]">
        <div>
          <h1 className="text-2xl font-semibold text-[#09090B]">Organization Users</h1>
          <p className="text-sm text-[#71717A] mt-1">Manage active team members, system access permissions, and profiles.</p>
        </div>
        <div>
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] transition shadow-sm"
          >
            <Plus className="w-5 h-5" /> Add new user
          </Link>
        </div>
      </div>

      {/* User Directory List */}
      {loading ? (
        <div className="py-16 text-center text-sm text-[#71717A]">Loading directory users...</div>
      ) : users.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <Users className="w-12 h-12 mx-auto text-[#A1A1AA] stroke-[1.5]" />
          <p className="text-base font-semibold text-[#09090B]">No users in directory</p>
          <p className="text-sm text-[#71717A]">Click "Add new user" above to provision personnel.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#E4E4E7]">
          {users.map((user) => (
            <div key={user.id} className="py-6 flex items-center justify-between hover:bg-[#FAFAFA] px-4 transition">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center font-bold text-base">
                  {user.email.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold text-[#09090B]">{user.email}</p>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                      Active Member
                    </span>
                  </div>
                  <p className="text-xs text-[#71717A] mt-1">
                    Added on {new Date(user.createdAt).toLocaleDateString()} • Corporate Domain Account
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F3F46] bg-[#F4F4F5] px-3 py-2 rounded-xl">
                  <Shield className="w-4 h-4 text-[#D97706]" /> Standard User
                </span>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2.5 rounded-xl text-[#71717A] hover:bg-red-50 hover:text-red-600 transition"
                  title="Delete User"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}