import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignUpModal.css';

const SignUpModal: React.FC = () => {
  const [username, setUsername] = useState('');
  const { setUsername: setAuthUsername } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setAuthUsername(username.trim());
      navigate('/main');
    }
  };

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <h1 className="signup-title">Welcome to CodeLeap network!</h1>
        <form onSubmit={handleSubmit} className="signup-form">
        <p className="signup-subtitle">Please enter your username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John doe"
            className="signup-input"
            autoFocus
          />
          <button
            type="submit"
            disabled={!username.trim()}
            className={`signup-button ${username.trim() ? 'active' : 'disabled'}`}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
