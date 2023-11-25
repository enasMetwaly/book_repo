

import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function EditUserModal({ user, onClose ,onUpdate }) {

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    is_staff: user.is_staff,
    is_active: user.is_active,
    password:user.password,
    avatar: null, // Initialize to null
    // Add input fields for other fields you want to edit
  });
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [avatarChanged, setAvatarChanged] = useState(false); // Track if a new avatar is selected




  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    setAvatarChanged(true); // Set avatarChanged to true when a new file is selected

  };


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


  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('email', formData.email);
    data.append('is_staff', formData.is_staff);
    data.append('is_active', formData.is_active);
    data.append('password', formData.password); // Use formData.password

    if (avatarChanged) {
      data.append('avatar', formData.avatar);
    }
    

    axios.put(`http://localhost:8000/api/users/${user.id}/`, data)
      .then((response) => {
        // Handle the response (e.g., update the user list)
        onUpdate(response.data); // Update the user in the parent component
        onClose(); // Close the modal
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.email) {
          setBackendError(error.response.data.email[0]);
        } else {
          console.error('Error editing user:', error);
        }
        });
  };

  

  return (
    <>
      <Modal show={true} onHide={onClose} backdrop="static" style={{ zIndex: '3000' }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter last name"
                isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                isInvalid={!!errors.email || !!backendError}
              />
              <Form.Control.Feedback type="invalid">{backendError || errors.email}</Form.Control.Feedback>

            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter new password"
                isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="isStaff">
              <Form.Check
                type="checkbox"
                label="Is Staff"
                checked={formData.is_staff}
                onChange={(e) => setFormData({ ...formData, is_staff: e.target.checked })}
              />
            </Form.Group>
            <Form.Group controlId="isActive">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              />
            </Form.Group>
            <Form.Group controlId="avatar">
              <Form.Label>
              Avatar file:      
              <span>
              {formData.avatar ? formData.avatar.name : user.avatar ? user.avatar.split('/').pop() : 'Select or no file chosen'}
            </span>


              </Form.Label>
              
              <Form.Control
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUserModal;
