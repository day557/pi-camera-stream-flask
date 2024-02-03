import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import user_icon from './assets/person.png';
import password_icon from './assets/password.png';
import pycam_icon from './assets/pycam.jpg';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simulating authentication logic for demo purposes
    if (username === 'demo' && password === 'demo') {
      // Successful login, navigate to the dashboard
      navigate('/dashboard');
    } else {
      // Failed login, set an error message
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <div className='header'>
        <img src={pycam_icon} alt="" />
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt="" />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt="" />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;