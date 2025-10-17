// frontend/src/components/JobForm.js
import React, { useState } from 'react';
import { createJobApi } from '../api';

const initial = { companyName: '', jobTitle: '', applicationDate: '', status: 'Applied', notes: '' };

export default function JobForm({ onSaved }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.companyName || form.companyName.trim().length < 3) return 'Company name must be at least 3 chars';
    if (!form.jobTitle || form.jobTitle.trim().length === 0) return 'Job title is required';
    if (!form.applicationDate) return 'Application date is required';
    const d = new Date(form.applicationDate);
    if (isNaN(d.getTime())) return 'Invalid date';
    if (d > new Date()) return 'Application date cannot be in the future';
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return alert(v);
    setLoading(true);
    try {
      await createJobApi(form);
      setForm(initial);
      onSaved && onSaved();
    } catch (err) {
      alert(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ minWidth: 420 }}>
      <h3>Add Job</h3>
      <div className="form-row" style={{ flexDirection: 'column', gap: 8 }}>
        <input placeholder="Company name" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
        <input placeholder="Job title" value={form.jobTitle} onChange={e => setForm({...form, jobTitle: e.target.value})} />
        <input type="date" value={form.applicationDate} onChange={e => setForm({...form, applicationDate: e.target.value})} />
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <textarea placeholder="Notes (optional)" rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
        <div>
          <button type="submit" className="primary" disabled={loading}>{loading ? 'Saving...' : 'Add Job'}</button>
        </div>
      </div>
    </form>
  );
}
