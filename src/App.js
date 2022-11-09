import logo from './logo.svg';
import './App.css';
import AddPost from './Pages/AddPost/AddPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Pages/Shared/NavBar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import Footer from './Pages/Shared/Footer';
import { useState, createContext } from 'react';
import RequireAuth from './Pages/Login/RequireAuth';
import Posts from './Pages/Posts/Posts';
import SinglePost from './Pages/Posts/SinglePost';

export const UserContext = createContext(); 

function App() {
  const [loggedInUser , setLoggedInUser]  = useState({})
  return (
    <UserContext.Provider value={[loggedInUser , setLoggedInUser]}>
      <NavBar></NavBar>
      <Routes>
        <Route path = "/" element = {<Home></Home>}></Route>
        <Route path = "/login" element = {<Login></Login>}></Route>
        <Route path = "/signup" element = {<Signup></Signup>}></Route>
        <Route path='/addPost' element={<RequireAuth><AddPost></AddPost></RequireAuth>}></Route>
        <Route path='/posts' element={<RequireAuth><Posts></Posts></RequireAuth>}></Route>
        <Route path='/posts/:postId' element = {<RequireAuth><SinglePost></SinglePost></RequireAuth>}></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
