import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const response = await fetch('http://localhost:5173/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // Send the username and password as JSON
    });
  
    if (response.ok) {
      console.log("hello");
    } else {
      console.log('Login failed');
      // Handle failed login here (e.g., show an error message)
    }
  };
  
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="text-center mb-4">OrganizeMe</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={handleUsernameChange} required placeholder="Enter your username" />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} required placeholder="Enter your password" />
          </Form.Group>
          <div className="pt-3">
            <Button type="submit" className="w-100">Log in</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
