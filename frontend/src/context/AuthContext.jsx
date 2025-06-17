import React, { createContext, useContext,useState,useEffect } from 'react'
import api from '../api';


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

  const Signup = async (formData) => {
    try {
      await api.post('/user/signup', formData);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Signup failed');
    }
  };

  const Login = async (email, password) => {
    try {
      await api.post('/user/login', { email, password });
  
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed');
    }
  };

  const Logout = async () => {
    await api.get('/user/logout');
    setIsAuthenticated(false);
    setUserId(null);
    window.location.reload();
  };

  const getAllBlog = async () => {
    try {
      const res = await api.get('/blog/all');
      setBlogPosts(res.data.blogs || []);
    } catch (error) {
      setBlogPosts([]);
    }
  };

  const addBlog = async (newPost) => {
    try {
      await api.post('/blog/add', newPost);
      await getAllBlog();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async (blogId, updatedData) => {
    try {
      const res = await api.put(`/blog/update/${blogId}`, updatedData);
      await getAllBlog();
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Update failed';
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await api.delete(`/blog/delete/${blogId}`);
      await getAllBlog();
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || 'Delete failed';
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/me');
        setIsAuthenticated(true);
        setUserId(res.data.id);
      } catch (error) {
        setIsAuthenticated(false);
        setUserId(null);
      } finally {
        setLoading(false); // FINISH CHECK
      }
    };

    fetchUser();
    getAllBlog();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogPosts,
        addBlog,
        Login,
        Signup,
        authError,
        Logout,
        isAuthenticated,
        userId,
        updateBlog,
        deleteBlog,
        loading, // expose loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>useContext(AuthContext);
