'client';
import { useState } from 'react';
// ... keep your existing imports and logo components

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send login link');
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... keep your left-hand side branding layout container
    <div className="flex flex-col justify-center px-8 py-12">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to Jyanipur</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your workspace email for passwordless access</p>
        </div>

        {sent ? (
          <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-2">
            <h3 className="font-semibold text-green-900">Check your inbox!</h3>
            <p className="text-xs text-green-700">We've sent a secure sign-in link to <b>{email}</b>.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">WORK EMAIL</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@jyanipur.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#0a192f] hover:bg-black text-white font-medium rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              {loading ? 'Sending link...' : 'Continue with Email →'}
            </button>
          </form>
        )}

        {/* Keep your local dev bypass box below */}
      </div>
    </div>
  );
}