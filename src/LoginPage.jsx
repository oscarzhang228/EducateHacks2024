import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  
    const response = await fetch('http://localhost:3000/login', {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Student's Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default LoginPage;
