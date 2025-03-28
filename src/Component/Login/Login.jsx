import React, { useState,useEffect } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 
import "./Login.css"; 
import { authActions } from "../Store/authSlice";
import { useDispatch,useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState(""); //
  const [password, setPassword] = useState(""); // 
  const [error, setError] = useState(""); // 
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const authState = useSelector((state)=> state.auth)
  
  useEffect(() => {
    console.log("Redux State Updated:", authState);
  }, [authState]); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Login Clicked:", email, password); 

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_API_KEY}`;

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
        dispatch(authActions.login({ token: data.idToken, email: data.email }));
        console.log("Redux State Updated:", authState);
        console.log("User Logged In:", data);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", data.email);

        navigate("/inbox");
        
 // ✅ Login hone ke baad redirect hoga
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>} {/* ✅ Error message show karega */}
          <Form onSubmit={handleLogin}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} // ✅ Input handle ho raha hai
                required 
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} // ✅ Input handle ho raha hai
                required 
              />
            </Form.Group>

            {/* Login Button */}
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            {/* Signup Link */}
            <div className="text-center mt-3">
              Don't have an account? <a href="/signup" className="text-primary fw-bold">Sign Up</a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
