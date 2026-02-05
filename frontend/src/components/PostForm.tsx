import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postsApi, CreatePostRequest } from '../services/api';
import './PostForm.css';

interface PostFormProps {
  username: string;
}

const PostForm: React.FC<PostFormProps> = ({ username }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(postsApi.createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      resetForm();
    },
  });

  const resetForm = (): void => {
    setTitle('');
    setContent('');
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!isFormValid) return;

    const postData: CreatePostRequest = {
      username,
      title: title.trim(),
      content: content.trim(),
    };

    createPostMutation.mutate(postData);
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="post-form-container">
      <h2 className="post-form-title">What's on your mind?</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
            className="form-input"
            disabled={createPostMutation.isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content here"
            className="form-textarea"
            rows={4}
            disabled={createPostMutation.isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid || createPostMutation.isLoading}
          className={`create-button ${isFormValid ? 'active' : 'disabled'}`}
        >
          {createPostMutation.isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
