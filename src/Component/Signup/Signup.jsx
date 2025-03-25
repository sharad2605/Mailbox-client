import React from "react";
import { useState } from "react";

import { Form, Button, Container, Card } from "react-bootstrap";
import "./Signup.css"; // Custom CSS

const Signup = () => {
  console.log("Signup Component Loaded!");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Button Clicked!");
    console.log("Signup Button Clicked!"); // ✅ Check if function is called
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    console.log(email, password, confirmPassword);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_API_KEY}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }

        setSuccess("Account created successfully! Now login to continue.");
        console.log("User Signed Up:", data);

        resetForm();
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSignup}>
            

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
              placeholder="Enter email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
              
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
            </Form.Group>

            {/* Signup Button */}
            <Button type="submit" variant="success" className="w-100">Sign Up</Button>

            {/* Login Link */}
            <div className="text-center mt-3">
              Already have an account? <a href="/login" className="text-success fw-bold">Login</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
