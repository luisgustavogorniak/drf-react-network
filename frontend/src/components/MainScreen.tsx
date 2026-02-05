import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PostForm from './PostForm';
import PostList from './PostList';
import './MainScreen.css';

const MainScreen: React.FC = () => {
  const { username } = useAuth();

  return (
    <div className="main-screen">
      <header className="navbar">
        <h1 className="navbar-title">CodeLeap Network</h1>
      </header>
      <main className="main-content">
        <PostForm username={username!} />
        <PostList currentUsername={username!} />
      </main>
    </div>
  );
};

export default MainScreen;
