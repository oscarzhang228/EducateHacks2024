import React, { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }) // Send the username and password as JSON
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      // Handle successful login here (e.g., redirect to another page)
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
