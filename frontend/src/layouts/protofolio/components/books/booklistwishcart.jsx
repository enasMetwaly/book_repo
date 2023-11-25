
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddBookForm from './AddBookModal';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [wishlist, setWishlist] = useState([]);  // State to track wishlist
  //for auth access
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  //for id and user info
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_data'));
    setUserdata(data);
  }, []);
  console.log(userdata);  // Add this line

  const userId = userdata ? userdata.id : null;
  console.log(userId)




  useEffect(() => {
    // Fetch book data from the API
    fetch('http://localhost:8000/api/books/')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => 
  {
    console.log(userId)

    // Fetch user's wishlist data from the API
    if (user) {
      fetch(`http://localhost:8000/api/wishlist/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access}`,
        },
  
      }
      
      )
        .then((response) => response.json())
        .then((data) => setWishlist(data.map((item) => item.book)))
        .catch((error) => console.error('Error fetching wishlist:', error));
    }
  }, [user]);

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleBookAdded = (newBook) => {
    // Update the books state when a new book is added
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };


  const handleToggleWishlist = (bookId) => {
    if (!userId || !user?.access) {
      // Redirect the user to the login page or display a message to log in
      // For redirection:
      window.location.href = '/login';
  
      // For displaying a message:
      console.error('User is not logged in. Please log in to add to wishlist.');
      return;
    }
      // Check if the book is already in the wishlist
    const isInWishlist = wishlist.some((book) => book.id === bookId);
  
    // Make a POST or DELETE request based on whether the book is in the wishlist or not
    const method = isInWishlist ? 'DELETE' : 'POST';
  
    fetch(`http://localhost:8000/api/wishlist/${userId}/`, {
      method: `${method}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access}`,
      },
      body: JSON.stringify({
        book_id: bookId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the local state with the added/removed book in the wishlist
          setWishlist((prevWishlist) => {
            if (isInWishlist) {
              return prevWishlist.filter((book) => book.id !== bookId);
            } else {
              return [...prevWishlist, books.find((book) => book.id === bookId)];
            }
          });
        } else {
          console.error(`Error ${method === 'POST' ? 'adding' : 'removing'} book to/from wishlist`);
        }
      })
      .catch((error) => {
        console.error('Error toggling wishlist:', error);
      });
  };
  
  // const handleToggleWishlist = (bookId) => {
  //   if (!userId) {
  //     console.error('User data or user ID not available');
  //     return;
  //   }
  
  //   // Check if the book is already in the wishlist
  //   const isInWishlist = wishlist.some((book) => book.id === bookId);
  
  //   // Make a DELETE or POST request based on whether the book is in the wishlist or not
  //   const method = isInWishlist ? 'DELETE' : 'POST';
  
  //   // URL for toggling the wishlist item
  //   const wishlistUrl = isInWishlist
  //     ? `http://localhost:8000/api/wishlist/${bookId}/`
  //     : `http://localhost:8000/api/wishlist/${userId}/`;
  
  //   fetch(wishlistUrl, {
  //     method: `${method}`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${user.access}`,
  //     },
  //     body: JSON.stringify({
  //       book_id: bookId,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // Update the local state with the added/removed book in the wishlist
  //         setWishlist((prevWishlist) => {
  //           if (isInWishlist) {
  //             return prevWishlist.filter((book) => book.id !== bookId);
  //           } else {
  //             return [...prevWishlist, books.find((book) => book.id === bookId)];
  //           }
  //         });
  //       } else {
  //         console.error(`Error ${method === 'POST' ? 'adding' : 'removing'} book to/from wishlist`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error toggling wishlist:', error);
  //     });
  // };
  

  
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


  return (
    <div>
      <div>
        <button onClick={handleFormOpen}>Add Book</button>
        {/* Assuming AddBookForm takes onBookAdded and onClose as props */}
        {showForm && <AddBookForm onBookAdded={handleBookAdded} onClose={handleFormClose} />}
      </div>

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={book.cover_page} alt="" style={{ width: '45px', height: '45px' }} className="rounded-circle" />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{book.name}</p>
                    <p className="text-muted mb-0">{book.title}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{book.description}</p>
                <p className="text-muted mb-0">{book.price}</p>
              </td>
              <td>
                <span className="badge badge-success rounded-pill d-inline">{book.status}</span>
                <button
                  type="button"
                  className={`btn btn-link btn-rounded btn-sm fw-bold ${wishlist.some((item) => item.id === book.id) ? 'text-danger' : ''}`}
                  data-mdb-ripple-color="dark"
                  onClick={() => handleToggleWishlist(book.id)}
                >
                  ❤️ Add to Wishlist
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-rounded btn-sm fw-bold"
                  data-mdb-ripple-color="dark"
                  onClick={() => handleAddToCart(book.id)}
                >
                  🛒 Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
