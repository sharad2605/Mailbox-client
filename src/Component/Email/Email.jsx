import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmailItem from "./EmailItem"; 
import {emailActions} from '../Store/emailSlice';


const Email = ({type='inbox'}) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const sanitizedReceiver = userEmail?.replace(/[@.]/g, "");
  const emails = useSelector((state) => state.email.inboxEmails); // ✅ direct redux se

  useEffect(() => {
    const fetchInbox = async () => {
      console.log("📢 Fetching mails...");
      const res = await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedReceiver}.json`);
      const data = await res.json();
      if (!data) return;

      const loadedEmails = Object.keys(data)
        .filter(key => data[key] !== null) // ✅ null check
        .map(key => ({
          id: key,
          ...data[key]
        }));

      dispatch(emailActions.setInboxEmails(loadedEmails));
    };
    fetchInbox();
    const interval = setInterval(fetchInbox, 20000); // fetch every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, [dispatch, sanitizedReceiver,emails.length]);

  const deleteEmailHandler = (emailId) => {
    console.log("Deleting email with ID:", emailId);
    const emailPath = type === 'inbox'
      ? `inbox/${sanitizedReceiver}/${emailId}.json`
      : `sent/${sanitizedReceiver}/${emailId}.json`;
  
    fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/${emailPath}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      dispatch(emailActions.deleteEmail(emailId)); // Redux action to update the state
    }).catch(error => console.error("Error deleting email:", error));
  };
  
  
  return (
    <div className="email-list-container">
      {emails.length === 0 ? (
      <p style={{ textAlign: 'center', marginTop: '50px', color: 'gray' }}>No Mails Found</p>
    ) : (
      emails.map((email, i) => (
        <EmailItem 
        key={i} 
        email={email} 
        onDelete={deleteEmailHandler}  // Pass the delete handler
        type={type} />
      ))
    )}
    </div>
  );
};

export default Email;
