import React, { createContext, useContext,useState,useEffect } from 'react'
import api from '../api';


const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated,setIsAuthenticated] = useState(false)    
    const [userId, setUserId] = useState(null) 
     const [authError,setAuthError] = useState(null)
      const [blogPosts, setBlogPosts] = useState(
        []
      );

   const Signup = async(formData) =>{
     try {
       await api.post('/user/signup',formData);
     } catch (error) {
      setAuthError(error.response?.data?.message || 'Signup failed')
     }
      
   }

 useEffect(() => {
  api.get('/user/me')
    .then(res => {
      setIsAuthenticated(true)
      setUserId(res.data.id)
    })
    .catch(() => {
      setIsAuthenticated(false)
      setUserId(null)
    })
  getAllBlog()
}, [])

    const Login = async (email, password) => {
    try {
      await api.post('/user/login', { email, password })
    
        setIsAuthenticated(true);
        setAuthError(null)
      
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed')
    }
  }


  const updateBlog = async (blogId, updatedData) => {
  try {
  
    const res = await api.put(`/blog/update/${blogId}`, updatedData)
     await getAllBlog();
    return res.data // { message: "Blog updated successfully!" }
  } catch (error) {
    throw error.response?.data?.message || 'Update failed'
  }
}

    const Logout = async() => {
      await api.get('/user/logout');
    setIsAuthenticated(false)
    window.location.reload() 
    }


    const deleteBlog = async(blogId) =>{
     try {
      const res = await api.delete(`/blog/delete/${blogId}`);
     await getAllBlog();
     return res.data
     } catch (error) {
       throw error.response?.data?.message || 'Delete failed'
     }
    }


 const addBlog = async (newPost) => {
    try {
      await api.post('/blog/add', newPost)
      await getAllBlog() // Refresh the blog list after adding
    } catch (error) {
      console.log(error);
    }
  }

 const getAllBlog = async () => {
    try {
      const res = await api.get('/blog/all')
      console.log(res.data.blogs);
      
      setBlogPosts(res.data.blogs || [])
      
        // Adjust according to your backend response
    } catch (error) {
      setBlogPosts([])
    }
  }




  return (
    <AuthContext.Provider  value={{blogPosts,addBlog,Login,Signup,authError,Logout,isAuthenticated,userId,updateBlog,deleteBlog}} >
     {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext);
