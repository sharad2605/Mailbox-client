import React, { useState } from 'react';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Header from './UI/Header/Header';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Email from './Component/Email/Email';
import SentEmail from './Component/Email/SentMail'; // Create a SentEmails component
import Sidebar from './UI/Sidebar/Sidebar';
import ComposeMail from './Component/ComposeMail/ComposeMail';
import EmailView from './Component/Email/EmailView';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="d-flex">

        {/* Show Header + Sidebar only when logged in */}
        {isLoggedIn && (
          <>
            <Sidebar onCompose={() => setShowModal(true)} />
            <Header />
            <ComposeMail showModal={showModal} setShowModal={setShowModal} />
          </>
        )}

        {/* Routes */}
        <div style={{ marginLeft: isLoggedIn ? "250px" : "0", width: "100%" }}>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/inbox" /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/inbox" element={isLoggedIn ? <Email /> : <Navigate to="/" />} />
            <Route path="/sent" element={isLoggedIn ? <SentEmail /> : <Navigate to="/" />} />
            <Route path="/mail/:mailId" element={<EmailView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
