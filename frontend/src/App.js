import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./components/nav/Nav"
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage'
import ActivatePage from './pages/ActivatePage';
import ResetPasswordPageConfirm from'./pages/ResetPasswordPageConfirm'
import NotFoundPage from './pages/NotFoundPage'
import UpdateUser from './layouts/protofolio/UpdateProfile';
import UserDetail from './layouts/protofolio/ProfileInfo';
import Protofolio from './layouts/protofolio/protofolio'
import UserList from './layouts/protofolio/components/users/usersList';
import AddBookForm from './layouts/protofolio/components/books/AddBookModal';
import AddBook from './layouts/protofolio/components/books/AddBookModal';
import BookList from './layouts/protofolio/components/books/BookList';
import Cartpage from './pages/cart';
import Checkout from './pages/checkout';
import CatogreyList from './pages/CategoryList';
import Wishlist from "./pages/Wishlist"
import Search from './pages/SearchPage';
import BookDetailPage from './pages/BookDetails';
import Footer from './components/Footer/Footer';
import Catogries from './pages/Catogries';
import SuccessRegister from './pages/SuccessRegister';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activate/:uid/:token" element={<ActivatePage />} />

          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPageConfirm />} />
          <Route path="/success-register" element={<SuccessRegister />} />

          <Route path="/user-update/:userId" element={<UpdateUser />} />
          <Route path="/user-data/" element={<UserDetail />} />

          <Route path="/protofolio" element={<Protofolio />} />
          <Route path="/book"  element={AddBook} />

          <Route path= "/cart"   element={<Cartpage />} />
          <Route path= "/Checkout"   element={<Checkout />} />




          <Route path="/updateProfile" element={<UpdateUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="userList" element={<UserList />}></Route>


          <Route path="bookList" element={<BookList />}></Route>



          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/catogerylist/:id" element={<CatogreyList />} />
          <Route path="/cats" element={<Catogries />} />
          <Route path="/details-book/:pk" element={<BookDetailPage/>} />



          






        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
