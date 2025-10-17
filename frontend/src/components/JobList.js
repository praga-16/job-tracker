// frontend/src/components/JobList.js
import React, { useState } from 'react';
import JobCard from './JobCard';
import JobDetailsModal from './JobDetailsModal';
import { deleteJobApi, updateJobApi } from '../api';

export default function JobList({ jobs, onChange }) {
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      setLoading(true);
      await deleteJobApi(id);
      onChange();
    } catch (err) {
      alert(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      setLoading(true);
      await updateJobApi(id, data);
      setEditing(null);
      onChange();
    } catch (err) {
      alert(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Applications</h2>
      {jobs.length === 0 && <p className="small">No applications yet</p>}
      {jobs.map(job => (
        <JobCard
          key={job._id}
          job={job}
          onView={() => setSelected(job)}
          onEdit={() => setEditing(job)}
          onDelete={() => handleDelete(job._id)}
        />
      ))}

      {selected && <JobDetailsModal job={selected} onClose={() => setSelected(null)} onDelete={() => { handleDelete(selected._id); setSelected(null); }} onEdit={() => { setEditing(selected); setSelected(null); }} />}

      {editing && <JobDetailsModal job={editing} onClose={() => setEditing(null)} editable onSave={handleUpdate} />}
    </div>
  );
}
