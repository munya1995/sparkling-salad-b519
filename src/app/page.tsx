'use client';
import { useState } from 'react';

export default function Page() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, email }),
    });

    const result = await res.json();

    if (res.ok) {
      setStatus('Registration successful!');
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  return (
    <main>
      <h1>Event Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
