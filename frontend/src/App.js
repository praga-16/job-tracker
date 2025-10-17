// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { fetchJobs } from './api';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import AuthForm from './components/AuthForm';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const load = async (status) => {
    setLoading(true);
    try {
      const data = await fetchJobs(status);
      setJobs(data);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('token')) {
        logout();
      } else alert(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) load(filter); }, [user, filter]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <AuthForm onAuth={(u) => setUser(u)} />;
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1>Job Tracker</h1>
        <div style={{ marginLeft: 'auto' }}>
          <span>Hi, {user.name}</span>
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
        </div>
      </header>

      <div className="top-row" style={{ marginTop: 12 }}>
        <JobForm onSaved={() => load(filter)} />
        <div className="filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All statuses</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button onClick={() => load(filter)}>Refresh</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : <JobList jobs={jobs} onChange={() => load(filter)} />}
    </div>
  );
}
