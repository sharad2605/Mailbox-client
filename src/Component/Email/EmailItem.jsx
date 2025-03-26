import React from 'react';
import './EmailItem.css';

const EmailItem = ({ email }) => {
  return (
    <div className="email-item">
      <input type="checkbox" className="email-checkbox" />
      <div className="email-info">
        <div className="email-to">{email.to}</div>
        <div className="email-subject">
          <strong>{email.subject}</strong>
        </div>
      </div>
      <span className="email-date">{email.time}</span>
    </div>
  );
};

export default EmailItem;
