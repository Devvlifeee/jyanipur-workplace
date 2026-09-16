"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JyanipurLoginButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJyanipurLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(data.redirectUrl);
        router.refresh();
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold tracking-wide text-cyan-400">JP-Workplace ID</h3>
        <p className="text-xs text-slate-400 mt-1">Secure access for jyanipur.com & jyanipur.in</p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-xs bg-red-950 text-red-300 border border-red-800 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleJyanipurLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Work Email
          </label>
          <input
            type="email"
            required
            placeholder="you@jyanipur.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition text-sm shadow-md disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Sign in with Jyanipur"}
        </button>
      </form>
    </div>
  );
}