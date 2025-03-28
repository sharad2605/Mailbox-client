import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Modal, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { emailActions } from '../Store/emailSlice';

const ComposeMail = ({ showModal, setShowModal }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const getPlainText = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    return rawContent.blocks.map(block => block.text).join('\n');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const sanitizedReceiver = e.target.value.replace(/[@.]/g, '');
    dispatch(emailActions.setEmail(sanitizedReceiver));
  };

  const reset =() =>{
    setEmail('');
      setSubject('');
      setEditorState(EditorState.createEmpty());
  }
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendMail = async () => {
    const mailBody = getPlainText();
    const senderEmail = localStorage.getItem('email');
    const sanitizedSender = senderEmail.replace(/[@.]/g, '');
    const sanitizedReceiver = email.replace(/[@.]/g, '');

    // Gmail style error handling
    const newErrors = {};
    if (!email) newErrors.email = "Recipient email is required";
    else if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!editorState.getCurrentContent().hasText()) newErrors.body = "Email body cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formatDate = (date) => new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(date);

    const emailData = {
      from: senderEmail,
      to: email,
      subject,
      body: mailBody,
      time: formatDate(new Date()),
      read: false
    };

    try {
      await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/inbox/${sanitizedReceiver}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      await fetch(`https://mailbox-client-auth-default-rtdb.firebaseio.com/sent/${sanitizedSender}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      console.log('✅ Email Sent Successfully!');
      reset();
      setErrors({});
      setShowModal(false);
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
            onChange={handleEmailChange}
            placeholder="To: example@gmail.com"
            className={`form-control my-2 ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className={`form-control my-2 ${errors.subject ? 'is-invalid' : ''}`}
          />
          {errors.subject && <small className="text-danger">{errors.subject}</small>}

          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Write your email here..."
            wrapperClassName="editor-wrapper"
            editorStyle={{
              minHeight: '200px',
              border: `1px solid ${errors.body ? 'red' : '#ccc'}`,
              padding: '10px'
            }}
          />
          {errors.body && <small className="text-danger">{errors.body}</small>}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {setShowModal(false),reset()} }>Close</Button>
        <Button variant="primary" onClick={sendMail}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeMail;
