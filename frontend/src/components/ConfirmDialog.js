// frontend/src/components/ConfirmDialog.js
import React from 'react';

export default function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div style={{ marginTop: 10 }}>
          <button onClick={onConfirm} className="primary">Yes</button>
          <button onClick={onCancel} style={{ marginLeft: 8 }}>No</button>
        </div>
      </div>
    </div>
  );
}
