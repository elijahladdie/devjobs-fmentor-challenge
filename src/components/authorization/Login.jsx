/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import "../../styles/login.css";
import toast, { Toaster } from 'react-hot-toast';

import { Navigate } from "react-router-dom";


const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setLogin(token)
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/auth`, { email, password });
        const { resp_code, data, resp_msg } = response.data;

        if (resp_code === 200) {
          localStorage.setItem('token', data); // Store the token in localStorage
          toast.success(resp_msg);
          setLogin(response.data)
        } else {
          toast.error(resp_msg);
        }
      } else {
        // Handle sign up
        const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/create`, { email, username, password });
        toast.success('Signup successful'); // Show success toast
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred'); // Show error toast
    }
  };


  return (
    <div className="login-container body-txt">
      <Toaster />
      {login && (
        <Navigate to="/admin" replace={true} />
      )}
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {!isLogin && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='btn'>{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <div className='flex login'>
        <p>{isLogin ? "Don't have an account? " : "Already have an account? "}</p>
        <button onClick={() => setIsLogin(!isLogin)} className="purple-button body-txt ">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
