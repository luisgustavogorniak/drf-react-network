import { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { postsApi, Post, UpdatePostRequest } from '../services/api';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  currentUsername: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUsername }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(postsApi.deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setShowDeleteModal(false);
    },
  });

  const updatePostMutation = useMutation(
    ({ id, data }: { id: number; data: UpdatePostRequest }) =>
      postsApi.updatePost(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        setShowEditModal(false);
      },
    }
  );

  const handleDelete = (): void => {
    deletePostMutation.mutate(post.id);
  };

  const handleEdit = (title: string, content: string): void => {
    updatePostMutation.mutate({
      id: post.id,
      data: { title, content },
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    return date.toLocaleDateString();
  };

  const isOwner = post.username === currentUsername;

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <h3 className="post-title">{post.title}</h3>
          {isOwner && (
            <div className="post-actions">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="action-button delete-button"
                aria-label="Delete post"
                disabled={deletePostMutation.isLoading}
              >
                <Trash2 size={20} />
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="action-button edit-button"
                aria-label="Edit post"
                disabled={updatePostMutation.isLoading}
              >
                <Edit size={20} />
              </button>
            </div>
          )}
        </div>
        <div className="post-meta">
          <span className="username">@{post.username}</span>
          <span className="timestamp">{formatDate(post.created_datetime)}</span>
        </div>
        <div className="post-content">
          {post.content}
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          isLoading={deletePostMutation.isLoading}
        />
      )}

      {showEditModal && (
        <EditModal
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
          initialTitle={post.title}
          initialContent={post.content}
          isLoading={updatePostMutation.isLoading}
        />
      )}
    </>
  );
};

export default PostCard;
