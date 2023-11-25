import React, { useState, useEffect } from 'react';
import BookForm from '../components/book/BookForm';

export default function AddBookPage() {
    const [categories, setCategories] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/api/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories', error));
    }, []);

    const handleFormSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('pages', data.pages);
        formData.append('stock', data.stock);
        formData.append('category', data.category);
        formData.append('cover_page', data.cover_page);
    
        try {
            const response = await fetch('http://localhost:8000/api/create-book', {
                method: 'POST',
                body: formData,
            });
    
            if (response.status === 201) {
                console.log('Book created successfully');
            } else if (response.status === 400) {
                const errors = await response.json();
                console.log('Validation errors:', errors);
    
                setValidationErrors(errors);
            } else {
                console.error('Error creating book');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <div>
            <h2>Create a New Book</h2>
            <BookForm onSave={handleFormSubmit} categories={categories} validationErrors={validationErrors} />
        </div>
    );
}