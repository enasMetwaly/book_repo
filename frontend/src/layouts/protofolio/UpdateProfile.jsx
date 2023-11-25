
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const UpdateUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_data'));
    setUserdata(data);
  }, []);

  const userId = userdata ? userdata.id : null;


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: null, // Set the "avatar" field to null initially
  });
  

    const [avatarChanged, setAvatarChanged] = useState(false); // Track if a new avatar is selected
    const [backendError, setBackendError] = useState('');
    const [errors, setErrors] = useState({});


  useEffect(() => {
    // Fetch the user data and populate the form fields
    axios.get(`http://localhost:8000/api/user_data/${userId}/`)
      .then((response) => {
        const userData = response.data;
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          avatar: userData.avatar, // Set the "avatar" value from the fetched data
        });
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'avatar') {
      setAvatarChanged(true); // Set avatarChanged to true when a new file is selected
    }

    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : newValue, // Handle file input
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const updatedUserData = new FormData(); // Create a FormData object
  //     updatedUserData.append('first_name', formData.first_name);
  //     updatedUserData.append('last_name', formData.last_name);
  //     updatedUserData.append('email', formData.email);
  //     updatedUserData.append('avatar', formData.avatar); // Append the file to the form data

  //     // Call the updateUser function to update user data
  //     await updateUser(userId, updatedUserData);
  //     console.log('User data updated successfully');
  //   } catch (error) {
  //     console.error('Error updating user data', error);
  //   }
  // };

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

    setErrors(newErrors); // Update errors state with newErrors

    return Object.keys(newErrors).length === 0; // Return true if no errors, false otherwise
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }

    try {
      const updatedUserData = new FormData(); // Create a FormData object
      updatedUserData.append('first_name', formData.first_name);
      updatedUserData.append('last_name', formData.last_name);
      updatedUserData.append('email', formData.email);
      // updatedUserData.append('avatar', formData.avatar); // Append the file to the form data
      if (avatarChanged) {
        updatedUserData.append('avatar', formData.avatar); // Append the file to the form data
      }
  
      // Call the updateUser function to update user data
      await updateUser(userId, updatedUserData);
      console.log('User data updated successfully');
  
      // Fetch updated user data and set it in the state
      const response = await axios.get(`http://localhost:8000/api/user_data/${userId}/`);
      const userData = response.data;
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        avatar: userData.avatar,
      });
      window.location.reload();

    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setBackendError(error.response.data.email[0]);
      } else {
        console.error('Error updating user:', error);
      }    
  }
  };

  // Define the updateUser function within the same file
  const updateUser = async (userId, userData) => {
    const BACKEND_DOMAIN = "http://localhost:8000";
    const UPDATE_USER_URL = `http://localhost:8000/api/user_update/${userId}/`;

    const config = {
      headers: {
        // No need to set "Content-type" for FormData
      },
    };

    try {
      const response = await axios.put(UPDATE_USER_URL, userData, config);
      return response.data;
    } catch (error) {
      // Handle any errors here
      console.error("Error updating user data", error);
      throw error; // Re-throw the error to be handled in your component
    }
  };

  return (
    

<div className='d-flex align-items-center justify-content-center m-5'>
<div className="col-lg-7 col-xlg-8 ">
<h1>Edit Your Profile</h1>

<div className="card">
  <div className="card-body">
    <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label className="col-md-12">First Name:</label>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control form-control-line"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <span className='text-danger'>{errors.first_name}</span> {/* Fix typo here */}

        </div>
      </div>
      <div className="form-group">
        <label className="col-md-12">Last Name:</label>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control form-control-line"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <span type="invalid" className='text-danger'>{errors.last_name}</span>

        </div>
      </div>
      <div className="form-group">
        <label className="col-md-12">Email:</label>
        <div className="col-md-12">
          <input
            type="text"
            className="form-control form-control-line"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className='text-danger' type="invalid">{backendError}</span>

        </div>
      </div>
      <div className="form-group">
        <label className="col-md-12">Avatar:</label>
        <div className="col-md-12">
          <input
            type="file"
            className="form-control form-control-line"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleInputChange}
            
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-md-12">
          <button className="btn btn-warning text-light ">Update Profile</button>
        </div>
      </div>
    </form>
  </div>
</div>
</div>
</div>
  );
};

export default UpdateUser;
