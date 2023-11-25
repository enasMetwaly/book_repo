

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategoryModal from './AddCat';
import { Button } from 'react-bootstrap';
import EditCategoryModal from './EditCat';
import DeleteCategoryModal from './DeleteCat';


const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = () => {
    axios.get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Trigger fetchCategories on component mount

  const handleCategoryAdded = (newCategory) => {
    // Update the category list after adding a category
    fetchCategories();
  };

  const handleCloseModal = () => {
    setSelectedCategoryId(null);
  };

  const handleCategoryDeleted = (deletedCategoryId) => {
    setCategoryData(categoryData.filter(category => category.id !== deletedCategoryId));
  };
  const handleCategoryUpdated = (updatedCategory) => {
    setCategoryData(prevData => prevData.map(category => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    }));
  };


  return (
    <>
    <div className=' m-5 '>


      <div className='d-flex justify-content-between'>
      <h2 style={{ color: '#566787' }}>Categories</h2>
      <AddCategoryModal show={false} handleClose={() => {}} onCategoryAdded={handleCategoryAdded} />
      </div>
      <table className="table align-middle mb-0 bg-white ">
        <thead className="bg-light">
          <tr>
            <th ></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th >Name</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category) => (
            <tr key={category.id}>
              <td>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: '45px', height: '45px', objectFit: "cover"}}       
                    className="rounded-circle"
                  />
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td>{category.name}</td>
              <td>
                <EditCategoryModal categoryToEdit={category} onCategoryUpdated={handleCategoryUpdated} />

                <DeleteCategoryModal
                  show={selectedCategoryId === category.id}
                  handleClose={handleCloseModal}
                  categoryId={category.id}
                  onCategoryDeleted={handleCategoryDeleted}
                />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default CategoryList;

