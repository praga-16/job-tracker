// frontend/src/components/JobDetailsModal.js
import React, { useState } from 'react';
import { updateJobApi } from '../api';

export default function JobDetailsModal({ job, onClose, editable=false, onSave, onDelete }) {
  const [form, setForm] = useState({
    companyName: job.companyName || '',
    jobTitle: job.jobTitle || '',
    applicationDate: job.applicationDate ? new Date(job.applicationDate).toISOString().split('T')[0] : '',
    status: job.status || 'Applied',
    notes: job.notes || ''
  });
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.companyName || form.companyName.trim().length < 3) return alert('Company name must be at least 3 characters');
    if (!form.jobTitle) return alert('Job title required');
    const d = new Date(form.applicationDate);
    if (d > new Date()) return alert('Application date cannot be in the future');

    try {
      setSaving(true);
      await updateJobApi(job._id, form);
      alert('Saved');
      onSave && onSave(job._id, form);
    } catch (err) {
      alert(err.message || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {!editable ? (
          <>
            <h3>{job.companyName} — {job.jobTitle}</h3>
            <p><strong>Applied:</strong> {new Date(job.applicationDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Notes:</strong> {job.notes || <em>None</em>}</p>
            <div style={{ marginTop: 10 }}>
              <button onClick={onClose}>Close</button>
              <button onClick={() => { onDelete && onDelete(); }} style={{ marginLeft: 8 }}>Delete</button>
              <button onClick={() => { /* switch to edit in parent */ }} style={{ marginLeft: 8 }}>Edit</button>
            </div>
          </>
        ) : (
          <form onSubmit={submit}>
            <h3>Edit</h3>
            <input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
            <input value={form.jobTitle} onChange={e => setForm({...form, jobTitle: e.target.value})} />
            <input type="date" value={form.applicationDate} onChange={e => setForm({...form, applicationDate: e.target.value})} />
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3}></textarea>
            <div style={{ marginTop: 8 }}>
              <button type="submit" disabled={saving} className="primary">{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
