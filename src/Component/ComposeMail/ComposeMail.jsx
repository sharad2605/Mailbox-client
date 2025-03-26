import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Modal, Button, Container } from 'react-bootstrap';

const ComposeMail = ({ showModal, setShowModal }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 🔥 Function to Extract Plain Text from Editor
  const getPlainText = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    return rawContent.blocks.map(block => block.text).join('\n');
  };

  // 📩 Function to Send Email (POST Request)
  const sendMail = async () => {
    const mailBody = getPlainText();
    const senderEmail = localStorage.getItem('email');
    const sanitizedSender = senderEmail.replace(/[@.]/g, '');
    const sanitizedReceiver = email.replace(/[@.]/g, '');
    
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'medium'
      }).format(date);
    };
    
    const emailData = {
      from: senderEmail,
      to: email,
      subject: subject,
      body: mailBody,
      time: formatDate(new Date()),
      read: false
    };

    try {
      const inboxResponse =await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedReceiver}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
  
      // ✅ 2. Save Mail in Sender's Sent Box
      const sentResponse = await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/sent/${sanitizedSender}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      
      if (inboxResponse.ok && sentResponse.ok) {
        console.log('✅ Email Sent Successfully!');
        setShowModal(false);
      } else {
        console.error('❌ Failed to Send Email');
      }
    } catch (error) {
      console.error('🚨 Error Sending Email:', error);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Compose Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="To: example@gmail.com"
            className="form-control my-2"
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="form-control my-2"
          />
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Write your email here..."
            wrapperClassName="editor-wrapper"
            editorStyle={{
              minHeight: '200px',
              border: '1px solid #ccc',
              padding: '10px'
            }}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        <Button variant="primary" onClick={sendMail}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeMail;
