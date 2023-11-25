
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function AddCategoryModal({onCategoryAdded }) {
  const [category, setCategory] = useState({
    name: '',
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!category.name) {
      newErrors.name = 'Category name is required';
    } else if (category.name.length < 3) {
      newErrors.name = 'Category name should be at least 3 characters';
    }

    if (!category.image) {
      newErrors.image = 'Please upload an image';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('image', category.image);

    axios
      .post('http://localhost:8000/api/categories/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setCategory({
          name: '',
          image: null,
        });
        setShowModal(false);
        // Optionally perform any action after adding the category if needed
        // For example: Display a success message or refresh the category list

        // Call the onCategoryAdded callback directly
        onCategoryAdded(); // Notify the parent component about the added category
  

      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.name) {
          setErrors({
            ...errors,
            name: 'Category with this name already exists',
          });
        } else {
          console.error('Error adding category:', error);
        }
      
      });
  };


  return (
    <>
      <button onClick={() => setShowModal(true)}   className='btn btn-primary btn-sm mx-5 my-2'>   
       <i class="fa-solid fa-plus" ><span>add cat</span></i></button>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" style={{zIndex:"3000"}}  >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCategory}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={category.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleInputChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleAddCategory}>
              Add Category
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

export default AddCategoryModal;
