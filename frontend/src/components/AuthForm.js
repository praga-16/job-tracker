// frontend/src/components/AuthForm.js
import React, { useState } from 'react';
import { login, register } from '../api';

export default function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        const data = await login(email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onAuth && onAuth(data.user);
      } else {
        const data = await register(name, email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onAuth && onAuth(data.user);
      }
    } catch (err) {
      alert(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '20px auto', padding: 16 }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mode === 'register' && <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div>
          <button type="submit" disabled={loading}>{loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}</button>
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ marginLeft: 8 }}>
            {mode === 'login' ? 'Create account' : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
