import React from 'react'
import Navbar from './components/Navbar'
import BlogPage from './pages/BlogPage'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import MyBlogs from './pages/MyBlogs'
import About from './pages/About'
import DetailBlog from './pages/DetailBlog'
import AddBlog from './pages/AddBlog'
import Signup from './components/Signup'
import Login from './components/Login'

const App = () => {
  return (
 <>
 <div className="w-full h-full bg-gray-100  fixed -z-2 ">
  </div>
 <Router>
    <Navbar />
    <Routes>
      <Route path='/' element={<BlogPage />} />
      <Route path='/myblogs' element={<MyBlogs/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/detail-blog' element={<DetailBlog/>} />
       <Route path='/add-blog' element={<AddBlog/>} />
        <Route path='/signup' element={<Signup />} />
         <Route path='/login' element={<Login />} />
    </Routes>
 </Router>
 </>
  )
}

export default App
