import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/careers';

export interface Post {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface CreatePostRequest {
  username: string;
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const postsApi = {
  getPosts: (): Promise<Post[]> => 
    api.get('/posts/').then(response => response.data),

  createPost: (data: CreatePostRequest): Promise<Post> => 
    api.post('/posts/', data).then(response => response.data),

  updatePost: (id: number, data: UpdatePostRequest): Promise<Post> => 
    api.patch(`/posts/${id}/`, data).then(response => response.data),

  deletePost: (id: number): Promise<void> => 
    api.delete(`/posts/${id}/`),
};
