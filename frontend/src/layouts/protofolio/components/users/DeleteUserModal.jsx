
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function DeleteUserModal({ user, onClose, onDelete }) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/users/${user.id}/`)
      .then((response) => {
        onDelete(user.id);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <Modal show={true} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>En</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {user.first_name} {user.last_name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;
