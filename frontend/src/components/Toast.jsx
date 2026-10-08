import React from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast-notification glass-panel ${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '⭐' : type === 'error' ? '⚠️' : '🔔'}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
};

export default Toast;