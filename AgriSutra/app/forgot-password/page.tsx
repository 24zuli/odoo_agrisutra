'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError('Error sending reset link');
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg w-96 rounded-large">
        <h2 className="text-3xl font-bold text-center text-green-700">Forgot Password</h2>
        {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}
        {message && <p className="text-green-600 text-center font-semibold mt-2">{message}</p>}
        <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-green-300 rounded-large px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-large hover:bg-green-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
