// import React from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { logout, reset } from '../../features/auth/authSlice'
// import { toast } from 'react-toastify'

// const Nav = () => {

//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const { user } = useSelector((state) => state.auth)

//     const handleLogout = () => {
//         dispatch(logout())
//         dispatch(reset())
//         navigate("/")
//     }


//     return (
//         <nav className="navbar">
//             <NavLink className="logo" to="/">Logo</NavLink>
//             <ul className="nav-links">
//                 {user ?
//                     <>
//                         <NavLink className='nav-childs' to="/dashboard">Dashboard</NavLink>
//                         <NavLink className='nav-childs' to="/" onClick={handleLogout}>Logout</NavLink>
//                     </>
//                     :
//                     <>
//                         <NavLink className='nav-childs' to="/dashboard">Dashboard</NavLink>
//                         <NavLink className='nav-childs' to="/login">login</NavLink>
//                         <NavLink className='nav-childs' to="/register">register</NavLink>


//                     </>
//                 }
//             </ul>
//         </nav>
//     )
// }

// export default Nav

import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import { logout, reset } from '../../features/auth/authSlice'
import { CiTextAlignLeft } from "react-icons/ci"
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from 'react-toastify'
import SearchPage from '../../pages/SearchPage';
// import Cartpage from '../../pages/Cartpage';
import { useState } from 'react';
import Sidebar from '../SideMenu/Sidebar';
import homeImg from "../../assets/home.png"
const Nav = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)
    console.log("nav",user)
    const openNav = () => {
        setIsOpen(true);
    };
    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    const goToCart = () => {
        navigate("/cart")

    };
    console.log(isOpen)


    const handleUserIconClick = () => {
        if (!user) {
          navigate('/login'); // Redirect to the login page if user is not logged in
        }
      };
    
      const handleWishlistIconClick = () => {
        if (!user) {
          navigate('/login'); // Redirect to the login page if user is not logged in
        } else {
          navigate('/wishlist'); // Redirect to the wishlist page if the user is logged in
        }
      };
        

    return (
        <>
            <div className=' '>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                <nav className="navbar ">

                    <div >
                        <NavLink className="nav-childs ms-3 me-0" to="/">
                          <img src={homeImg} alt="Home" style={{ height: '50px', width: '50px' }} />

                        </NavLink>


                    </div>

                    <ul className="nav-links">
                        {user ?
                            <>
                                <NavLink className='nav-childs' to="/" onClick={handleLogout}>Logout</NavLink>
                            </>
                            :
                            <>
                                <NavLink className='nav-childs' to="/login">login</NavLink>
                                <NavLink className='nav-childs' to="/register">register</NavLink>
                                <NavLink className='social-media right-nav'>
                                 
                                </NavLink>


                            </>
                        }
                    </ul>

                </nav>
                <div>

                    <nav className="navbar ">

                        <NavLink className='nav-childs ms-3' onClick={openNav}> <CiTextAlignLeft color="white" fontSize="1.8em" /> Browser Catageries </NavLink>
                        <form className="d-flex w-50">
                            <SearchPage
                            />
                        </form>
<NavLink to="/wishlist">
        <FiHeart
          color="white"
          fontSize="1.5em"
        // Call the function when the wishlist icon is clicked
        />
      </NavLink>

                        <NavLink to="/protofolio">
                        <FaUserAlt
                          color="white"
                          fontSize="1.5em"
                       
                        />
                      </NavLink>
                      <NavLink to="/cart" className=' text-white  m-4 '><FiShoppingCart className='m-2' color="white" fontSize="1.5em" /> 0.000 EGP  </NavLink>




                    </nav>







                </div>

            </div>
        </>
    )
}

export default Nav

