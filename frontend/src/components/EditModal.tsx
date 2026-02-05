import { useState, useEffect } from 'react';
import './EditModal.css';

interface EditModalProps {
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle: string;
  initialContent: string;
  isLoading: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
  onClose,
  onSave,
  initialTitle,
  initialContent,
  isLoading,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!isFormValid) return;

    onSave(title.trim(), content.trim());
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Edit item</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-title" className="form-label">Title</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hello world"
              className="form-input"
              autoFocus
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-content" className="form-label">Content</label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content here"
              className="form-textarea"
              rows={4}
              disabled={isLoading}
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-button cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`modal-button save-button ${isFormValid ? 'active' : 'disabled'}`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
