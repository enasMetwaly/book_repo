// export default Sidebar;
import React from "react";
import "./Sidebar.css";
import { Link } from 'react-router-dom';

import { useState , useEffect} from "react";
const Sidebar = ({ isOpen, setIsOpen }) => {
  const closeNav = () => {
    setIsOpen(false);
  };
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setcategories(data);
        setLoading(false);
      });
  }, []);
  return (
    
      <div id="myNav" className="overlay" style={{width: isOpen ? '25%':'0' , height:isOpen?'100%':'0'}}>
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <div className="overlay-content">
        {categories.map((category) => (
       <Link to={`/catogerylist/${category.id}`}>{category.name}</Link>
      ))}
          
         
        </div>
      </div>
    
  );
};

export default Sidebar;