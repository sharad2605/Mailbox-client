import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmailItem from "./EmailItem"; 
import {emailActions} from '../Store/emailSlice';


const Email = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const sanitizedReceiver = userEmail?.replace(/[@.]/g, "");
  const emails = useSelector((state) => state.email.emails); // ✅ direct redux se

  useEffect(() => {
    const fetchInbox = async () => {
      const res = await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedReceiver}.json`);
      const data = await res.json();
      if (!data) return;

      const loadedEmails = Object.keys(data)
        .filter(key => data[key] !== null) // ✅ null check
        .map(key => ({
          id: key,
          ...data[key]
        }));

      dispatch(emailActions.setEmails(loadedEmails));
    };
    fetchInbox();
  }, [dispatch, sanitizedReceiver]);


  return (
    <div className="email-list-container">
      {emails.length === 0 ? (
      <p style={{ textAlign: 'center', marginTop: '50px', color: 'gray' }}>No Mails Found</p>
    ) : (
      emails.map((email, i) => (
        <EmailItem key={i} email={email} />
      ))
    )}
    </div>
  );
};

export default Email;
