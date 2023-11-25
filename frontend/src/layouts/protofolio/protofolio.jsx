import React from "react";

// Import external CSS files
import './assets/vendor/aos/aos.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/glightbox/css/glightbox.min.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/css/style.css';
import UserList from "./components/users/usersList";
import ResponsiveSidebar from "./ResponsiveSide";
import UserDetail from "./ProfileInfo";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookList from "./components/books/BookList";
import CategoryList from "./components/categories/CatList";
import UpdateUser from "./UpdateProfile";
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { CiTextAlignLeft } from "react-icons/ci"
import { FiHeart, FiShoppingCart, FiHome, FiUser, FiSettings } from 'react-icons/fi';

import { FaUserAlt } from "react-icons/fa";
import homeImg from "../../assets/home.png"
import { FaUserEdit } from 'react-icons/fa';


const Protofolio = () => {
  const { user } = useSelector((state) => state.auth);

  const [userdata, setUserdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_data'));
    setUserdata(data);
  }, []);

  const userId = userdata ? userdata.id : null;
  console.log(userId)
  console.log("protofo", userdata)


  const [selectedComponent, setSelectedComponent] = useState('UserDetail');

  const handleLinkClick = (component) => {
    fetchUserData(); // Fetch user data when navigating to different components

    setSelectedComponent(component);
  };




  const [isMobileNavActive, setMobileNavActive] = useState(false);

  const handleMobileNavToggle = () => {
    setMobileNavActive(!isMobileNavActive);
  };


  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: null,
    is_superuser: false
  });

  const fetchUserData = () => {
    console.log("protofolio", userId)
    if (!user) {
      navigate('/login'); // Redirect to the '/login' route if userId is null or undefined
      return;
    }

    axios
      .get(`http://localhost:8000/api/users/${userId}/`)
      .then((response) => {
        const userData = response.data;
        console.log('protofolio', userData);

        setUserData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          avatar: userData.avatar,
          is_superuser: userData.is_superuser,
          is_staff: userData.is_staff
        });
      })
      .catch((error) => {
        console.error('Error fetching user data', error);


      });
  };

  useEffect(() => {
    fetchUserData();


  }, [userId,selectedComponent]);





  return (
    <>
      <div className={` ${isMobileNavActive ? 'mobile-nav-active' : ''}`}
      >
        <i
          className={`bi bi-list mobile-nav-toggle d-xl-none ${isMobileNavActive ? 'bi-x' : ''}`}
          onClick={handleMobileNavToggle}
        ></i>
        <i
          className={`bi bi-list mobile-nav-toggle d-xl-none ${isMobileNavActive ? 'bi-x' : ''}`}
          onClick={handleMobileNavToggle}
        ></i>
        <header id="header">
          <div className="d-flex flex-column my-5">

            <div className="profile">
              <img src={userData.avatar} alt="" className="img-fluid rounded-circle" />
              <h1 className="text-light"><a href="index.html"></a></h1>
            </div>

            <nav id="navbar" className={`nav-menu navbar my-5 ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
              <ul className="">
                {userData.is_superuser === true && ( // Render Dashboard only if is_superuser is true
                  <li>
                    <a
                      className={`nav-link scrollto${selectedComponent === 'UserList' ? ' active' : ''
                        }`}
                      onClick={() => handleLinkClick('UserList')}
                    >
                    <FiSettings color="white" fontSize="1.5em"/> {' '}
                      <span className="text-white  p-1">Dashboard</span>
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className={`nav-link scrollto${selectedComponent === 'UserDetail' ? ' active' : ''}`}
                    onClick={() => handleLinkClick('UserDetail')}
                  >
                  <FaUserAlt color="white" fontSize="1.2em"/>  <span className="text-white  p-2">Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto${selectedComponent === 'UpdateUser' ? ' active' : ''}`}
                    onClick={() => handleLinkClick('UpdateUser')}
                  >
                    <FaUserEdit color="white " fontSize="1.6em"/> <span className="text-white  p-2">Edit profile</span>
                  </a>
                </li>
                <li>
                <NavLink to="/" className="nav-link ">
                <i class="fa-solid fa-arrow-right-from-bracket"  style={{color:"white" }}></i>
                 <span className="text-white p-2">home</span>
                 </NavLink>
                </li>



              </ul>
            </nav>
          </div>
        </header>
       
      

        <main id="main" >

          {selectedComponent === 'UserList' && (
            <>
              <UserList />
              <BookList />
              <CategoryList />
            </>
          )}

          {selectedComponent === 'UserDetail' && <UserDetail />}
          {selectedComponent === 'UpdateUser' && <UpdateUser />}





        </main>


      </div>

    </>
  )

}
export default Protofolio;
