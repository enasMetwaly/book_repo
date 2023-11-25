
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function DeleteCategoryModal({ categoryId, onCategoryDeleted }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteCategory = () => {
    axios
      .delete(`http://localhost:8000/api/categories/${categoryId}/delete/`)
      .then(() => {
        onCategoryDeleted(categoryId); // Pass the ID of the deleted category
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn btn-link btn-sm btn-rounded">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" style={{ zIndex: '3000' }}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this category?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCategoryModal;
