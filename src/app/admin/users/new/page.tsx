'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewUserWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [sendCredentials, setSendCredentials] = useState(true);

  // Result state
  const [createdData, setCreatedData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((firstName || lastName || username) && step < 3) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [firstName, lastName, username, step]);

  const handleDiscard = () => {
    if ((firstName || lastName || username) && step < 3) {
      if (!confirm('Discard changes and return to users?')) return;
    }
    router.push('/admin/users');
  };

  const handleUsernameChange = (val: string) => {
    const cleaned = val.toLowerCase().replace(/[^a-z0-9._]/g, '');
    setUsername(cleaned);
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !username) {
      setError('Please fill in all required user fields.');
      return;
    }

    setStep(2);
  };

  const handleConfirmProvisioning = async () => {
    setError('');
    setLoading(true);
    const fullEmail = `${username}@jyanipur.com`;

    try {
      const res = await fetch('/api/workspace-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: fullEmail,
          forwardTo: forwardTo.trim() || null,
          sendCredentials,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCreatedData(data.data);
        setStep(3);
      } else {
        setError(data.error || 'Failed to create user account.');
        setStep(1);
      }
    } catch (err) {
      setError('An unexpected network error occurred.');
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-full space-y-8 bg-white min-h-screen text-[#09090B]">
      
      {/* Top Header & Horizontal Step Tracker */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E4E4E7]">
        <div className="flex items-center gap-8">
          <button
            onClick={handleDiscard}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D97706] hover:underline"
          >
            <ArrowLeft className="w-5 h-5" /> Back to users
          </button>
          
          <div className="flex items-center gap-6">
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${step === 1 ? 'bg-[#D97706] text-white' : 'bg-[#F4F4F5] text-[#71717A]'}`}>
              1. Information
            </span>
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${step === 2 ? 'bg-[#D97706] text-white' : 'bg-[#F4F4F5] text-[#71717A]'}`}>
              2. Review
            </span>
            <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${step === 3 ? 'bg-emerald-600 text-white' : 'bg-[#F4F4F5] text-[#71717A]'}`}>
              3. Complete
            </span>
          </div>
        </div>

        {step < 3 && (
          <button
            onClick={handleDiscard}
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" /> {error}
        </div>
      )}

      {/* Main Form Content */}
      <div className="space-y-8 pt-2">
        
        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleProceedToReview} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#09090B]">Add a new user</h2>
              <p className="text-sm text-[#71717A] mt-1">Enter the user's name and assign their primary domain email address.</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-[#3F3F46] mb-2">First name *</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E4E4E7] text-sm text-[#09090B] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] flex items-center"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#3F3F46] mb-2">Last name *</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E4E4E7] text-sm text-[#09090B] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] flex items-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-[#3F3F46] mb-2">Primary email address *</label>
                <div className="flex h-12 rounded-xl border border-[#E4E4E7] overflow-hidden focus-within:border-[#D97706] focus-within:ring-1 focus-within:ring-[#D97706]">
                  <input
                    type="text"
                    required
                    placeholder="john.doe"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className="flex-1 h-full px-4 text-sm text-[#09090B] focus:outline-none bg-transparent"
                  />
                  <span className="px-5 bg-[#F4F4F5] text-[#71717A] text-sm flex items-center font-semibold border-l border-[#E4E4E7]">
                    @jyanipur.com
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3F3F46] mb-2">Recovery / Forwarding Email (Optional)</label>
                <input
                  type="email"
                  placeholder="personal@gmail.com"
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#E4E4E7] text-sm text-[#09090B] focus:outline-none focus:border-[#D97706] focus:ring-1 focus:ring-[#D97706] flex items-center"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="sendCreds"
                checked={sendCredentials}
                onChange={(e) => setSendCredentials(e.target.checked)}
                className="w-5 h-5 rounded border-[#E4E4E7] text-[#D97706] focus:ring-[#D97706]"
              />
              <label htmlFor="sendCreds" className="text-sm text-[#3F3F46] font-medium">
                Automatically generate and email temporary password credentials
              </label>
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-[#E4E4E7]">
              <button
                type="button"
                onClick={handleDiscard}
                className="px-6 py-3.5 rounded-xl border border-[#E4E4E7] text-sm font-semibold text-[#09090B] hover:bg-[#F4F4F5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] shadow-sm"
              >
                Continue to Review
              </button>
            </div>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#09090B]">Review user details</h2>
              <p className="text-sm text-[#71717A] mt-1">Confirm account parameters before creating the domain user.</p>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 text-sm">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">User Full Name</span>
                <p className="text-lg font-bold text-[#09090B]">{firstName} {lastName}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Assigned Email Account</span>
                <p className="text-lg font-bold text-[#D97706]">{username}@jyanipur.com</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Forwarding Destination</span>
                <p className="text-base font-semibold text-[#09090B]">{forwardTo || 'None'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">Credential Dispatch</span>
                <p className="text-base font-semibold text-[#09090B]">{sendCredentials ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3.5 rounded-xl border border-[#E4E4E7] text-sm font-semibold text-[#09090B] hover:bg-[#F4F4F5]"
              >
                Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmProvisioning}
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] shadow-sm"
              >
                {loading ? 'Creating User...' : 'Add new user'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-8 text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#09090B]">User added successfully</h2>
              <p className="text-sm text-[#71717A] mt-2">The account <strong>{createdData?.email}</strong> is now live and provisioned.</p>
            </div>

            <div className="max-w-md mx-auto space-y-2 text-left">
              <span className="text-xs font-semibold text-[#71717A] uppercase tracking-wider">
                Temporary Security Password:
              </span>
              <div className="flex items-center justify-between bg-[#F4F4F5] px-5 py-4 rounded-xl border border-[#E4E4E7]">
                <code className="text-sm font-mono text-[#09090B] font-bold">{createdData?.tempPassword || 'Securely Generated'}</code>
                <span className="text-xs text-emerald-600 font-bold">Ready</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => router.push('/admin/users')}
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] shadow-sm"
              >
                Done / Return to Users Directory
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}