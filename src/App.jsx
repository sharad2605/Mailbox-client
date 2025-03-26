import React, { useState } from 'react';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Header from './UI/Header/Header';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Email from './Component/Email/Email';
import SentEmail from './Component/Email/SentMail'; // Create a SentEmails component
import Layout from './Component/Layout/Layout';
import Sidebar from './UI/Sidebar/Sidebar';
import ComposeMail from './Component/ComposeMail/ComposeMail';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(false);  // Manage modal state

  return (
    <Router>
      <div>
        <Header />

        <Routes>
          {/* Redirect to Inbox after login */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/inbox" /> : <Login />}
          />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route - Inbox */}
          <Route
            path="/inbox"
            element={isLoggedIn ? (
              <div className="d-flex">
                <Sidebar onCompose={() => setShowModal(true)} /> {/* Sidebar with Compose */}
                <Email />
                <ComposeMail showModal={showModal} setShowModal={setShowModal} />
              </div>
            ) : (
              <Navigate to="/" />
            )}
          />

          {/* Protected Route - Sent */}
          <Route
            path="/sent"
            element={isLoggedIn ? (
              <Layout>
                <SentEmail />
              </Layout>
            ) : (
              <Navigate to="/" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
