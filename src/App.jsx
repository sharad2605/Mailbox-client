import React from 'react';
import Signup from './Component/Signup/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
           <div >
         
          <Routes>
            <Route path="/signup" element={<Signup />} />
           
          </Routes>
          </div>
        </Router>
    </>
  )
}

export default App
