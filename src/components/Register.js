import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed!');
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1 className="title">APPOINTMENTS</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="DOCTOR">DOCTOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Register;
