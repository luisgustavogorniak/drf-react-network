import React from 'react';
import { useQuery } from 'react-query';
import { postsApi, Post } from '../services/api';
import PostCard from './PostCard';
import './PostList.css';

interface PostListProps {
  currentUsername: string;
}

const PostList: React.FC<PostListProps> = ({ currentUsername }) => {
  const { data: posts = [], isLoading, error } = useQuery(
    'posts',
    postsApi.getPosts,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error loading posts</div>;
  }

  if (posts.length === 0) {
    return <div className="no-posts">No posts yet. Be the first to share something!</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUsername={currentUsername}
        />
      ))}
    </div>
  );
};

export default PostList;
