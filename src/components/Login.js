import React, { useState } from 'react';
import './Login.css';
import {auth} from './Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from './AuthContext';

const Login = () => {
  const { setIsLogin } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLogin(true);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLogin(true);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="overlay">
      <div className="login-modal">
        <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          {isSignup && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          )}
          <button type="submit" className="submit-button">
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : 'New here?'}
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="toggle-button">
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
