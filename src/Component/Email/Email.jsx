import React, { useEffect, useState } from "react";


const Email = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      const userEmail = localStorage.getItem("email"); // 🔥 Current logged-in user
      if (!userEmail) {
        console.error("❌ User not logged in!");
        return;
      }

      const sanitizedEmail = userEmail.replace(/[@.]/g, ""); // ✅ Remove @ and . for Firebase key
      const inboxUrl = `https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedEmail}.json`;

      try {
        const response = await fetch(inboxUrl);
        const data = await response.json();

        if (!data) {
          console.log("📭 Inbox Empty");
          setEmails([]); // ✅ Set empty array if no emails
          return;
        }

        console.log("📩 Full Inbox Data:", data);

        // ✅ Correctly convert Firebase object to array
        const parsedEmails = Object.entries(data).map(([id, email]) => ({
          id, // Unique ID
          ...email, // Spread email data
        }));

        console.log("✅ Parsed Received Emails:", parsedEmails);
        setEmails(parsedEmails);
      } catch (error) {
        console.error("🚨 Error Fetching Inbox:", error);
      }
    };

    fetchInbox();
  }, []);

  return (
    <div className="container mt-6 ">
      <h2>📥 Inbox</h2>
      {emails.length === 0 ? (
        <p>No emails found!</p>
      ) : (
        <ul className="list-group">
          {emails.map((email) => (
            <li key={email.id} className="list-group-item">
              <strong>From:</strong> {email.from} <br />
              <strong>Subject:</strong> {email.subject} <br />
              <strong>Time:</strong> {email.time} <br />
              <p>{email.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Email;
