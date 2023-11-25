



import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function AddUserModal({ show, handleClose, onUserAdded }) {
  const [backendError, setBackendError] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_staff: false,
    is_active: true,
    avatar: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



const [errors, setErrors] = useState({});


const validateForm = () => {
    const newErrors = {};
      // First name validation
      if (!formData.first_name) {
        newErrors.first_name = 'First name is required';
      } else if (formData.first_name.length < 3) {
        newErrors.first_name = 'First name must be at least 3 characters';
      }
  
      // Last name validation
      if (!formData.last_name) {
        newErrors.last_name = 'Last name is required';
      } else if (formData.last_name.length < 3) {
        newErrors.last_name = 'Last name must be at least 3 characters';
      }
  

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

   // Password validation
   if (!formData.password) {
    newErrors.password = 'Password is required';
  } else {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one letter, one number, and one special character (!@#$%^&*)';
    }
  }    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('is_staff', formData.is_staff);
    data.append('is_active', formData.is_active);
    data.append('avatar', formData.avatar);

    axios.post('http://localhost:8000/api/users/', data)
      .then((response) => {
        onUserAdded(response.data);
        handleClose();
      })
      .catch((error) => {
        
        if (error.response && error.response.data && error.response.data.email) {
          setBackendError(error.response.data.email[0]);
        } else {
          console.error('Error adding user:', error);
        }
        });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" style={{ zIndex: '3000' }}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {backendError && <Alert variant="warning">{backendError}</Alert>}

          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="Enter first name"
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Enter last name"
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              isInvalid={!!errors.email || !!backendError}

            />
            <Form.Control.Feedback type="invalid">{backendError}</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="avatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          {/* Add other form fields for is_staff, is_active, etc. */}
          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
