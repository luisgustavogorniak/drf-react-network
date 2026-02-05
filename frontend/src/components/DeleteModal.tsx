import React from 'react';
import './DeleteModal.css';

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="delete-modal-title">Are you sure you want to delete this item?</h2>
        <div className="delete-modal-actions">
          <button
            onClick={onClose}
            className="delete-modal-button delete-cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="delete-modal-button delete-confirm-button"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
