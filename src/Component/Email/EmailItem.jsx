import React from 'react';
import './EmailItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../Store/emailSlice';
import { useNavigate } from 'react-router-dom';
import './EmailView.css';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const EmailItem = ({ email , showUnreadDot = true,onDelete, type = 'inbox'}) => {

  // console.log("Email Item Props:", email, showUnreadDot, onDelete); // Log all props
  // console.log("onDelete in EmailItem:", onDelete); // This should log a function
  if (typeof onDelete !== 'function') {
    console.error("onDelete is not a function in EmailItem");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.auth.email);
  const sanitizedReceiver = userEmail?.replace(/[@.]/g, "");

  const openMailHandler = async () => {
    const mailId = email.id;

    try {
      // Step 1: Redux - mark as read
      dispatch(emailActions.markAsRead(mailId));

      // Step 2: Firebase - update read status
      await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedReceiver}/${mailId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ read: true }),
        headers: { 'Content-Type': 'application/json' }
      });

      // Step 3: Navigate to full mail view
      navigate(`/mail/${mailId}`, { state: { email } });

    } catch (error) {
      console.error("Error updating email read status:", error);
    }
  };

  const deleteEmailHandler = () => {
    if (email && email.id) {
      console.log('Deleting email with ID:', email.id);  // Debug log
      onDelete(email.id);  // Call the parent delete handler with the email ID
    } else {
      console.error('Email or email ID is missing');
    }
  };
  

  return (
    <div className="email-item"  style={{ cursor: 'pointer' }}>
      <input type="checkbox" className="email-checkbox"  />
      {showUnreadDot && !email.read && <span style={{ color: 'blue', marginRight: '5px' }}>⬤</span>}
      <div className="email-info" onClick={openMailHandler}>
        <div className="email-to">{email.to}</div>
        <div className="email-subject">
          <strong>{email.subject}</strong>
        </div>
      </div>
      <span className="email-date">{email.time}</span>
      <div>
      <span><FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: '20px', color: 'red' }} onClick={deleteEmailHandler} /></span>
      </div>
    </div>
  );
};

export default EmailItem;
