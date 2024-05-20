import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import AuthApi from '../utils/AuthApi';
import { useUser } from '../contexts/UserContext';
import './FormStyles.css' 

// Prop is 'login' function in App.js
function LoginForm() {
  const { login } = useUser();
  // Define navigate to be used to redirect after succesful log in
  const navigate = useNavigate();
  // Set state for the two fields our authenticate method requires to post to backend
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await AuthApi.login(formData.username, formData.password);
      // Call the login prop/function passed from App to Routes with the received token and current username
      login(token);
      // Redirect to homepage after login success
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="main-form">
      <div className="form-item">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;