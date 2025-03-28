import React from "react";
import { NavLink } from "react-router-dom"; 
import { useSelector } from "react-redux";

// Using NavLink for active class management

const Sidebar = ({ onCompose }) => {

  const emails = useSelector((state) => state.email.emails);
  const unreadEmails = emails.filter((email) => email.read === false);
  const totalUnreadMessages = unreadEmails.length;

  console.log(Array.isArray(emails)); // Should log true if it's an array
console.log(emails); // Check the actual value of emails
  
  

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{
      width: "250px",
      height: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
    }}>
      <h3 className="text-center">📨 My Mailbox</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button className="btn btn-danger w-100 my-2" onClick={onCompose}>
            Compose ✍️
          </button>
        </li>
        <li>
          <NavLink
            to="/inbox"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Inbox 📥 ({totalUnreadMessages > 0 ? totalUnreadMessages : 'No unread messages'})
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sent"
            className={({ isActive }) => isActive ? 'nav-link text-white active' : 'nav-link text-white'}
          >
            Sent 📤
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
