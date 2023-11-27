import React from 'react';
import { Button } from 'react-bootstrap';
import "./No_wish_list_items.css";

const NoWishListItems = () => {
  return (
    <div className="container-fluid no-watch-list-container m-5">
      <div className="row align-items-center">
        <div className="col-md-12">
          <h1 className="watch-list-title text-center">wishlist</h1>
        </div>
        <div className="pt-5 col-md-12 text-center">
          <svg className="pt-3 watch-list-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" fill="#D1D1D1">
            <path d="M204.253 73.2113C204.253 84.9256 202.382 95.7544 199.134 105.795C183.58 155.015 135.64 184.449 111.916 192.521C108.569 193.702 103.056 193.702 99.7094 192.521C93.4092 190.355 85.4351 186.713 76.8708 181.594C71.3582 178.346 70.4722 170.667 75.0004 166.139L186.041 55.0983C191.357 49.7826 200.709 52.0467 202.579 59.3312C203.662 63.761 204.253 68.3877 204.253 73.2113Z" />
            <path d="M209.456 2.14107C206.601 -0.71369 201.876 -0.71369 199.021 2.14107L175.987 25.176C168.21 20.7462 159.153 18.1868 149.506 18.1868C131.689 18.1868 115.741 26.8495 105.799 40.1389C95.8564 26.8495 79.9086 18.1868 62.091 18.1868C31.8699 18.1868 7.35839 42.7968 7.35839 73.2147C7.35839 84.9291 9.22874 95.7574 12.4773 105.798C18.8759 126.175 30.8855 143.205 44.4703 156.692L2.14107 199.021C-0.71369 201.876 -0.71369 206.601 2.14107 209.456C3.61767 210.932 5.48803 211.621 7.35839 211.621C9.22874 211.621 11.0991 210.932 12.5757 209.456L209.456 12.5757C212.311 9.72094 212.311 4.99583 209.456 2.14107Z" />
          </svg>
          
          


          <p className="no-movies-message">No books add to wishlist</p>
          <a href="/" className="button-link">
            <Button className="btn btn-warning back-to-home-button">Back to home</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoWishListItems;
