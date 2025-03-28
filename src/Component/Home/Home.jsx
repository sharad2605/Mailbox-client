import React, { useState } from "react";
import Sidebar from "../../UI/Sidebar/Sidebar";
import ComposeMail from "../ComposeMail/ComposeMail";
import Email from "../Email/Email";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex">
  {/* Sidebar - Fixed Width */}
  <Sidebar onCompose={() => setShowModal(true)} />

  {/* Main Content - Flexible Width */} 
  <Email/>
  {/* Compose Mail Modal */}
  <ComposeMail showModal={showModal} setShowModal={setShowModal} />
</div>

  );
};

export default Home;
