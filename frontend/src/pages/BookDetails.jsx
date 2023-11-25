import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Rating } from 'react-simple-star-rating';
import { Button } from 'react-bootstrap';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../components/nav/Nav';
import Footer from '../components/Footer/Footer';

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const { pk } = useParams();
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [book, setBook] = useState(null);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [allReviews, setAllReviews] = useState([]);



  const { user } = useSelector((state) => state.auth);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_data'));
    setUserdata(data);
  }, []);

  const userId = userdata ? userdata.id : null;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch book data from the API
    fetch('http://localhost:8000/api/books/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBooks(data);
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleBookAdded = (newBook) => {
    // Update the books state when a new book is added
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleAddToCart = (bookId) => {
    if (!userId || !user?.access) {
      // Redirect the user to the login page or display a message to log in
      // For redirection:
      window.location.href = '/login';
  
      // For displaying a message:
      console.error('User is not logged in. Please log in to add to wishlist.');
      return;
    }
      // Make a POST request to the AddToShopCartView endpoint
    fetch('http://localhost:8000/api/add-to-cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        book_id: bookId,
        quantity: 1,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Book added to cart:', data);

        // Update the local state with the added book
        setBooks((prevBooks) => {
          return prevBooks.map((book) => {
            if (book.id === bookId) {
              return { ...book, inCart: true };
            }
            return book;
          });
        });
      })
      .catch((error) => {
        console.error('Error adding book to cart:', error);
      });
  };





  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0 || reviewText.trim() === '') {
      console.log('Please provide both a rating and review text.');
      return;
    }

    const reviewData = {
      review_star: rating, // Match the field name to the backend
      review_text: reviewText,
      book: book.id,
      user:userId

    };

    try {
      const response = await axios.post('http://localhost:8000/api/reviews/', reviewData);
      console.log('Review submitted successfully:', response.data);
      // Handle success (e.g., show a success message)
      window.location.reload(true); // Pass true to force reload from the server

    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error (display a user-friendly error message)
    }
  };


  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };
  useEffect(() => {

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/details-book/${pk}`);
        setBook(response.data);

        const categoryResponse = await axios.get(`http://localhost:8000/api/categories/${response.data.category}/`);
        setCategory(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    const fetchReviewsForBook = async () => {
      try {
        // Assuming an API endpoint to fetch reviews for a specific book
        const response = await axios.get(`http://localhost:8000/api/reviews/${pk}/`);
        setAllReviews(response.data);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviewsForBook();
    fetchBookDetails();
  }, [pk]);

  if (!book) {
    return <p>Loading...</p>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Assuming allReviews is the array of reviews and review.review_star contains the rating

  // Extract ratings from all reviews
  const ratings = allReviews.map(review => review.review_star);

  // Calculate the total sum of ratings
  const totalRatings = ratings.reduce((total, rating) => total + rating, 0);

  // Calculate the average rating
  const averageRating = totalRatings / allReviews.length;

  // Log or use the averageRating as needed
  console.log(`Average Rating: ${averageRating}`);



  return (
    <>
    <Nav/>
    <div className="container m-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <img src={book.cover_page} alt={book.name} className="card-img-top w-50 justify-content-center" />
            <h2 className="card-title mt-2 pt-2">{book.name}</h2>
            <div className="card-body">
              <div className="nav nav-tabs">
                <span
                  onClick={() => handleTabClick('details')}
                  className={activeTab === 'details' ? 'nav-link active' : 'nav-link'}
                >
                  Details
                </span>
                <span
                  onClick={() => handleTabClick('description')}
                  className={activeTab === 'description' ? 'nav-link active' : 'nav-link'}
                >
                  Description
                </span>
                <span
                  onClick={() => handleTabClick('reviews')}
                  className={activeTab === 'reviews' ? 'nav-link active' : 'nav-link'}
                >
                  Reviews({allReviews.length})
                </span>
              </div>
              <div className="tab-content">
                {activeTab === 'details' && (
                  <div className='mx-auto my-3 col-6'>
                    <p>Pages: {book.pages}</p>
                    <p>Stock: {book.stock}</p>
                    {category ? <p>Category: {category.name}</p> : <p>Loading category...</p>}
                  </div>
                )}
                {activeTab === 'description' && (
                  <div className='mx-3 my-3'>
                    <p className="card-text">{book.description}</p>
                  </div>
                )}
                {activeTab === 'reviews' && (


                  <div className=' my-3'>

                    <div className='mb-5'>

                      {allReviews.length > 0 && activeTab === 'reviews' && (
                        <div className=' my-5'>
                          <div className='row justify-content-between '>
                            <h4 className='col-7 d-flex'>Reviews for {book.name}</h4>
                            <h4 className='col-4 mb-5 d-flex justify-content-end me-3'><Rater
                              total={5}
                              rating={averageRating}
                              interactive={false}
                              style={{
                                star: {
                                  fillColor: 'orange', // Set the active star color to orange
                                  emptyColor: 'gray', // Set the inactive star color to gray
                                },
                              }}
                            /></h4>




                          </div>
                          <div className='my-0'>


                            <ul >
                              {allReviews.map(review => (
                                <li className='mx-0' key={review.id} >

                                  <p className=' border  p-3'>Review : {review.review_text}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                    </div>
                    <h4 className='mb-3'>Be the first to review “{book.name}”</h4>
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='me-3'>Select a rating (required)</Form.Label>
                        <Rating
                          onClick={handleRating}
                          ratingValue={rating}
                          size={20}
                          label
                          transition
                          fillColor='orange'
                          emptyColor='gray'
                          className='foo'
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Details please! Your review helps other shoppers. *</Form.Label>
                        <Form.Control as="textarea" rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Button type="submit" variant="warning" size="lg">Post</Button>
                      </Form.Group>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card position-sticky top-0">
            <div className="card-body ">
              <h3 className="card-title primary-color">Price : <span >{book.price}</span>$</h3>

            

              <div className='mt-3   font-weight-bold'>
              <button
              className='btn  btn-warning btn-lg btn-block  text-white '
             
                type="button"
                onClick={() => handleAddToCart(book.id)}
              >
              aad to cart
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
};

export default BookDetailPage;