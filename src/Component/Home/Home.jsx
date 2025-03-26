import React, { useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import ComposeMail from "../ComposeMail/ComposeMail";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <h1>Welcome to Mailbox Client</h1>

      {/* Compose Mail Button */}
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Compose Mail
      </button>
      <ComposeMail showModal={showModal} setShowModal={setShowModal}/>
      
    </>
  );
};

export default Home;
