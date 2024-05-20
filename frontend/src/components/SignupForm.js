import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../utils/AuthApi';
import { useUser } from '../contexts/UserContext';
import './FormStyles.css';

function SignUpForm() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
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
      const { access_token } = await AuthApi.register(formData);
      if (access_token) {
        login(access_token);  // Login function now uses only the token
        navigate('/');  // Redirect to homepage after successful registration
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
      <div className="form-item">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
