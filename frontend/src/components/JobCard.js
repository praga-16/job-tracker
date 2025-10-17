// frontend/src/components/JobCard.js
import React from 'react';

export default function JobCard({ job, onView, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <div className="job-info">
        <strong>{job.companyName} — {job.jobTitle}</strong>
        <div className="small">Applied: {new Date(job.applicationDate).toLocaleDateString()}</div>
        <div className="small">Status: {job.status}</div>
      </div>
      <div className="actions">
        <button onClick={onView}>View</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
