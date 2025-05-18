import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import NavBar from './components/NavBar';
import Blog from './pages/Blog';
import {Toaster} from 'react-hot-toast'

function App() {  

  return (
    <Router>
      <Toaster position='top-right' toastOptions={{duration:3000}} />
      <NavBar />
      <Routes>
          <Route path='/' element={<Navigate to="/register" replace />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element = {<Blogs />} />
          <Route path='/blogs/:id' element = {<Blog />} />
          <Route path='/edit-blog/:id' element = {<EditBlog />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/my-blogs' element={<MyBlogs />} />
        
      </Routes>
    </Router>
 
  )
}

export default App
