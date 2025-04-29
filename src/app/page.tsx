'use client';

import { useState } from 'react';

export default function HomePage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Registered successfully!');
    } else {
      setMessage(`❌ Error: ${data.error || 'Try again.'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        className="border p-2 w-full"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Register</button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
