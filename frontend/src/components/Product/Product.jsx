import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const Product = ({ book }) => {
    const {
        id,
        name,
        description,
        price,
        stock,
        category,
        cover_page,
        pages,
    } = book;

    















    

    return (
        <div className="col-lg-3 col-md-2 mb-5 position-relative">
    <div className="card h-100" style={{ backgroundColor: "white" }}>
        <Link
            pro={book}
            className="text-decoration-none"
            to={`/details-book/${book.id}`}
        >
            <img
                src={book.cover_page}
                className=""
                alt="Card image cap"
            />
            <div className="card-body d-flex text-start align-items-stretch flex-column">
                <div className="row justify-content-between h-50">
                    <h6 className="card-title fw-bold col-9">{book.name}</h6>
                </div>
            </div>
        </Link>
        <div className="mt-2 justify-content-center">
            <FiHeart color="black" fontSize="1.5em" />
            <button className="bg-warning w-100 p-3" onClick={(event) => event.preventDefault()}>Add To Cart</button>
        </div>
    </div>
</div>

        // <div className="col-lg-3 col-md-2 mb-5 position-relative">
        //         <div
        //             className="card h-100"
        //             style={{ backgroundColor: "white" }}

        //         >
        //         <Link
        //         pro={book}
        //         className="text-decoration-none"
        //         to={`/details-book/${book.id}`}
        //     >

        //             <img
        //               src={book.cover_page}  

        //                 className=""
                        
        //                 alt="Card image cap"
        //             />

        //             <div className="card-body d-flex  text-start align-items-stretch flex-column  ">
        //                 <div className="row justify-content-between h-50">
        //                     <h6 className="card-title fw-bold col-9">{book.name}</h6>

        //             </div>
        //             </Link>

        //                 <div className="mt-2 justify-content-center  ">
        //                 <FiHeart color="white" fontSize="1.5em" />

        //                     <button className="bg-warning w-100 p-3" onClick={(event) => event.preventDefault()}>Add To Cart</button>
        //                 </div>
                        
        //             </div>
        //         </div>
        // </div>
        // <Col xs="12" sm="6" md="4" lg="2" className="my-3 ">
        //   <Link to={`/details-book/${book.id}`}>
        //     <div className="card">
        // <img
        //   src={
        //     book.cover_page.startsWith('http://localhost:8000/')
        //       ? book.cover_page
        //       : `http://localhost:8000/${book.cover_page}`
        //   }
        //   className="card__image"
        //   alt="Book Cover"
        // />
        //       <div className="card__overlay">
        //         <div className="overlay__text text-center w-100 p-2">
        //           <p>Book Title: {name}</p>
        //           <p>Price: {price}</p>

        //         </div>
        //       </div>
        //     </div>
        //   </Link>
        //   <div className="  bg-light   justify-content-between row">
        //          <div className="col-6"><button >Add to Cart</button> </div>   
        //             <div className="col-6"
        //               onClick={(event) => {
        //                 handleWishlistToggle(book.id);
        //                 event.preventDefault();
        //               }}
        //             >
        //               {wishlist.some((m) => m === book.id) ? (
        //                 <Favorite
        //                   sx={{ color: "red" }}
        //                   style={{ cursor: "pointer" }}
        //                   fontSize="large"
        //                 />
        //               ) : (
        //                 <FavoriteBorder
        //                   sx={{ color: "131722" }}
        //                   fontSize="large"
        //                   style={{ cursor: "pointer" }}
        //                 />
        //               )}
        //             </div>
        //           </div>
        // </Col>
    );
};

export default Product;