// import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

// export default function Slider({ books }) {
    
//   return (
//     <div className="z-0" >
//     <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
//       <div >
//         <Carousel>
//           {books.map((book, index) => (
//             <Carousel.Item key={index}>
//               <div className='vh-75'
//                 style={{ 
//                   backgroundImage: `url(${book.cover_page})`,
//                   width: '100%',
//                   height: '300px', /* Adjust the height here */
//                   backgroundSize: 'cover ', /* Adjust background sizing */
//                   objectFit: 'cover',
//                   backgroundPosition: 'center',
//                   backgroundRepeat: 'no-repeat'
//                 }}
//               />
//               <Carousel.Caption>
//                 <h3>{book.name}</h3>
//                 {/* Additional information about the category can be added here */}
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   </div>
  
//   );
// }

import React, { useState } from 'react';
import "./slider.css"

export default function Slider({ topFiveBooks }) {
  const images = topFiveBooks.map((book) => book.cover_page);
  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  function prevSlide() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  const badgeStyle = {
    fontSize: '36px', // Increase the font size
    padding: '16px 24px', // Adjust padding for a larger size
    position: 'absolute',
    top: '0',
    left:"62%",
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    backgroundColor: '#b689b0',
  };

  return (
    <div className='mydiv'>
      <div className="slider">
        <div className="left-arrow" onClick={prevSlide}>
        <div className='d-flex align-items-center'>
        <i class="fa-solid fa-chevron-left text-secondary"></i>
        </div>
        </div>
 
       
    

        <div className="right-arrow  text-secondary" onClick={nextSlide}>
        <div className='d-flex align-items-center'>

        <i class="fa-solid fa-chevron-right"></i>
        </div>

        </div>
        {topFiveBooks.map((book, index) => (
          current === index && (
            <div key={index} className="slide">
              <div
                className='vh-75'
                style={{
                  backgroundImage: `url(${book.cover_page})`,
                  width: '50%',
                  height: '550px', // Adjust the height here
                  backgroundSize: 'cover', // Adjust background sizing
                  objectFit: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position:"relative"
                }}
              />
              <span className='bg-warning' style={badgeStyle}>
              <p style={{fontSize:"14px",margin:"0"}} >only</p>
              <p style={{fontSize:"14px"}} >{book.price}$</p>

              <span className="visually-hidden">unread messages</span>
            </span>
        
              <div className="caption">
                <h3  className=' text-secondary' >5 Top Rated books </h3>  

                {/* Additional information about the category can be added here */}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';

// export default function Slider({ books }) {
//   return (
//     <div className="z-0">
//       <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
//         <div>
//           <Carousel>
//             {/* Use 'books' data here if needed */}
//             {books.map((book, index) => (
//               <Carousel.Item key={index}>
//                               <h3>{book.name}</h3>

//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// }
