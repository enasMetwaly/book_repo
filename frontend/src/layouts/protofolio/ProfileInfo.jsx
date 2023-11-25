
import './assets/vendor/aos/aos.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/css/style.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './ProfileInfo.css'; // Import your custom CSS file

const UserDetail = () => {
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_data'));
    setUserdata(data);
  }, []);

  const userId = userdata ? userdata.id : null;






  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: null,
  });

  const fetchUserData = () => {
    axios
      .get(`http://localhost:8000/api/users/${userId}/`)
      .then((response) => {
        const userData = response.data;
        setUserData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          avatar: userData.avatar,
        });
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <>
    
    <div className='d-flex align-items-center flex-column  p-5  m-5'>
    <h2 style={{ color: '#566787' }}>Profile Information</h2>

    <div className="container  p-5 ">

<div className="card">
        {/* Display the existing user avatar */}
        {userData.avatar && (
          <div>
            <img
              src={userData.avatar}
              alt="User Avatar"
              className="img-circle img-thumbnail isTooltip"
            />
            <ul className="list-inline ratings text-center">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-star"></span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-star"></span>
                </a>
              </li>
              {/* Add more star elements as needed */}
            </ul>
          </div>
        )}
        <strong>Information</strong>
        <div className="table-responsive">
          <table className="table table-user-information">
            <tbody>
              <tr>
                <td>
                  <strong>
                    <span className="glyphicon glyphicon-user  text-primary"></span>
                    frist Name
                  </strong>
                </td>
                <td className="text-primary">{userData.first_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    <span className="glyphicon glyphicon-cloud text-primary"></span>
                    Lastname
                  </strong>
                </td>
                <td className="text-primary">{userData.last_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    <span className="glyphicon glyphicon-bookmark text-primary"></span>
                    Username
                  </strong>
                </td>
                <td className="text-primary">{userData.frist_name}{userData.last_name}</td>
              </tr>
            
              <tr>
                <td>
                  <strong>
                    <span className="glyphicon glyphicon-envelope text-primary"></span>
                    Email
                  </strong>
                </td>
                <td className="text-primary">{userData.email}</td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserDetail;
