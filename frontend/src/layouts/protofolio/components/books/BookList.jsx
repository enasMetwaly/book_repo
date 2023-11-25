



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal'; // Import the EditBookModal component
import DeleteBookModal from './DeleteBookModal';
const BookList = () => {
  const [books, setBooks] = useState([]);
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


  const handleBookAdded = (newBook) => {
    // Update the books state when a new book is added
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };



  const [showBookModal, setShowBookModal] = useState(false); // State to manage displaying the Add Book modal

  const handleBookModalOpen = () => {
    setShowBookModal(true);
  };

  const handleBookModalClose = () => {
    setShowBookModal(false);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Placeholder function for updating book details
  const handleBookUpdated = (updatedBook) => {
    // Update the books array with the updated book details
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    setShowEditModal(false);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedBook(null);
    setShowEditModal(false);
  };
 


  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for DeleteBookModal
  const [bookToDelete, setBookToDelete] = useState(null); // State to store the book to delete

  // ...other code

  const handleDeleteModalOpen = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const handleBookDeleted = (deletedBookId) => {
    setBooks(books.filter((book) => book.id !== deletedBookId));
  };
  return (
    <div  className=' mx-5 my-5'>
      <div >
      <div  className='d-flex justify-content-between'>
      <h2 style={{ color: '#566787' }}>books</h2>

      <button onClick={handleBookModalOpen}  className='btn btn-primary btn-sm  mx-5 my-2'>
      <i class="fa-solid fa-plus"><span>add book</span></i>
      </button>
      {/* Render the AddBookModal component */}
      {showBookModal && <AddBookModal show={showBookModal} handleClose={handleBookModalClose} onBookAdded={handleBookAdded} />}
    </div>
   


      </div>

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={book.cover_page} alt="" style={{ width: '45px', height: '45px', objectFit: "cover"}} className="rounded-circle" />
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
              <button onClick={() => handleEditBook(book)} className="btn btn-link btn-sm btn-rounded"> <i class="fa-solid fa-gear "></i> </button>
              </td>
              <td>
              <button onClick={() => handleDeleteModalOpen(book.id)} className="btn btn-link btn-sm btn-rounded"> <i class="fa-solid fa-xmark"></i></button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {selectedBook && (
        <EditBookModal
          show={showEditModal}
          onClose={handleEditModalClose}
          book={selectedBook}
          onSave={handleBookUpdated}
        />
      )}

      {showDeleteModal && (
        <DeleteBookModal
          show={showDeleteModal}
          handleClose={handleDeleteModalClose}
          bookId={bookToDelete}
          onDelete={handleBookDeleted}
        />
      )}  
    </div>
  );
};

export default BookList;
