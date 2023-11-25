import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteBookModal = ({ show, handleClose, bookId, onDelete }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/books/${bookId}/delete/`)
      .then((response) => {
        // Call the onDelete function passed from the parent component
        onDelete(bookId);
        handleClose(); // Close the modal after successful deletion
      })
      .catch((error) => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this book?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBookModal;
