import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './category.css'
export default function Catogrey({ Catogrey }) {
  const imageSize = {
    width: '100%', // Ensure the image spans the entire width of the column
    height: '150px', // You can adjust the height as needed
  };

  return (
   

    <div  className="my-3 mx-0">
      <Link to={`/catogerylist/${Catogrey.id}`}>
        <div className=" mx-0">
          <img 
                 src={Catogrey.image}
            style={{ height: '70%', width: '100%' }} // Apply the fixed height to the image
            className="imagee object-fit-cover"
            alt="imagee"
          />
          <div className="overlay">
            <div className=" overlay-content text-center w-100 p-2">
              <p>Category Title: {Catogrey.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

 // <div xs="12" sm="6" md="4" lg="6" className="my-4 mx-0">
    //   <Link to={`/catogerylist/${Catogrey.id}`}>
    //     <div className="card mx-0">
    //       <div className="card__overlay">
    //       {Catogrey.image && (
    //         <img
    //           src={Catogrey.image}
    //           alt={Catogrey.name}
    //         />
    //       )}
    //         <div className="overlay__text text-center w-100 p-2">
    //           <p>Category Title: {Catogrey.name}</p>

    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>