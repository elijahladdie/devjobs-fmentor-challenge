/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "../../styles/login.css"
const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic for login or sign up based on the value of isLogin
    if (isLogin) {
      // Handle login
    } else {
      // Handle sign up
    }
  };

  return (
    <div className="login-container body-txt">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isLogin ? null : (
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
      <div className='flex'>

        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </p>
        <button onClick={() => setIsLogin(!isLogin)} className="purple-button body-txt ">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>

    </div>
  );
}

export default LoginForm;
