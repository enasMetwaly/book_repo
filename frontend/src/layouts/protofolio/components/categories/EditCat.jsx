


import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function EditCategoryModal({ categoryToEdit, onCategoryUpdated }) {
  const [category, setCategory] = useState({
    id: '',
    name: '',
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendErrors, setBackendErrors] = useState({});

  useEffect(() => {
    if (categoryToEdit) {
      setCategory({
        id: categoryToEdit.id || '',
        name: categoryToEdit.name || '',
        image: null,
      });
    }
  }, [categoryToEdit]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCategory({
      ...category,
      [name]: files ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (category.name.length < 3) {
      newErrors.name = 'Category name should be at least 3 characters';
    }
    if (!category.image) {
      newErrors.image = 'Please upload an image';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleEditCategory = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', category.name);

    if (!category.image) {
      formData.append('image', categoryToEdit.image);
    } else {
      formData.append('image', category.image);
    }
    axios
      .put(`http://localhost:8000/api/categories/${category.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        onCategoryUpdated(response.data);
        setShowModal(false);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          const newErrors = {};

          if (errorData.name) {
            newErrors.name = errorData.name;
          }
          if (errorData.image) {
            newErrors.image = errorData.image;
          }

          setBackendErrors(errorData);
          setErrors(newErrors);
        }
        console.error('Error editing category:', error);
      });
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn btn-link btn-sm btn-rounded p-3">
        <i className="fa-solid fa-gear "></i>
      </button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        style={{ zIndex: '3000' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditCategory}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name || backendErrors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image || backendErrors.image}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCategoryModal;
