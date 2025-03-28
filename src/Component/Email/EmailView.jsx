import React from 'react';
import './EmailView.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  if (!email) {
    return <p>Email not found! <button onClick={() => navigate(-1)}>Go Back</button></p>;
  }

  return (
    <div className="email-view-container">
      <h2>{email.subject}</h2>
      <p><strong>From:</strong> {email.from}</p>
      <p><strong>To:</strong> {email.to}</p>
      <p><strong>Date:</strong> {email.time}</p>
      <hr />
      <div className="email-body" dangerouslySetInnerHTML={{ __html: email.body }}></div>
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default EmailView;
