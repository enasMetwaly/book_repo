
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
function EditBookModal({ book, onSave, onClose }) {
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [stock, setStock] = useState(book.stock);
  const [category, setCategory] = useState(book.category);
  const [pages, setPages] = useState(book.pages);
  const [cover_page, setCoverPage] = useState( null); // Use the existing cover page if it exists
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (name.length < 5) {
      newErrors.name = 'Name must be at least 5 characters';
    }

    if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (stock < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

   
    if (pages <= 0) {
      newErrors.pages = 'Pages must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isFormValid = validateForm(); // Validate the form

    if (isFormValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('pages', pages);

      // if (cover_page) {
      //   formData.append('cover_page', cover_page); // Append the new cover image
      // }
      if (cover_page) {
        formData.append('cover_page', cover_page);
      }
      axios.put(`http://localhost:8000/api/books/${book.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          onSave(response.data);
          onClose();
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.name) {
            setErrors({
              ...errors,
              name: 'book with this name already exists',
            });
          } else {
            console.error('Error adding category:', error);
          }
        
        });        
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="bookName">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bookDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bookPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bookStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              isInvalid={!!errors.stock}
            />
            <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bookCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Form.Control>
            {errors.category && <Form.Text className="text-danger">{errors.category}</Form.Text>}
          </Form.Group>
          <Form.Group controlId="bookPages">
            <Form.Label>Pages</Form.Label>
            <Form.Control
              type="number"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              isInvalid={!!errors.pages}
            />
            <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="bookCoverPage">
          <Form.Label>Cover Page (Image)</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setCoverPage(e.target.files[0])}
            isInvalid={!!errors.cover_page}
          />
        </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditBookModal;
