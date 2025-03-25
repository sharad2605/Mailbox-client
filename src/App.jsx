import React from 'react';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
           <div >
         
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          </div>
        </Router>
    </>
  )
}

export default App
