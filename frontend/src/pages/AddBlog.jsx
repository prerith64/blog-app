import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilePlus, ImagePlus, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addBlog, userId ,updateBlog} = useAuth();

  const isEdit = location.state?.isEdit || false;
  const existingData = location.state?.blogData;
  const existingBlogId = location.state?.blogId;
  
  

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    description: '',
    images: [],
  });
  const [imageUrl, setImageUrl] = useState('');

  // Pre-fill form if edit mode
  useEffect(() => {
    if (isEdit && existingData) {
      setFormData({
        title: existingData.title || '',
        abstract: existingData.abstract || '',
        description: existingData.description || '',
        images: existingData.images || [],
      });
    }
  }, [isEdit, existingData, userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }));
      setImageUrl('');
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userId) {
    alert('You must be logged in.');
    return;
  }
   console.log(isEdit,existingBlogId);
  if (isEdit && existingBlogId) {
    try {
      console.log("existing");
      await updateBlog(existingBlogId, formData);
      navigate('/myblogs');
    } catch (err) {
      alert('Failed to update blog');
    }
  } else {
    // Add new blog
    try {
      await addBlog(formData);
      navigate('/myblogs');
    } catch (err) {
      alert('Failed to add blog');
    }
  }
};

  return (
    <div className="container mx-auto bg-white p-6 mt-4 rounded-md shadow space-y-6">
      <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
        <FilePlus size={28} />
        {isEdit ? 'Edit Blog' : 'Create New Blog'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            className="w-full p-3 border rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Abstract</label>
          <textarea
            name="abstract"
            placeholder="Short summary..."
            className="w-full p-3 border rounded-md"
            rows={3}
            value={formData.abstract}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Full blog content..."
            className="w-full p-3 border rounded-md"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold mb-2 flex items-center gap-1">
            <ImagePlus /> Add Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste image URL"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="block w-full border p-2 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`upload-${idx}`}
                  className="w-24 h-24 object-cover rounded-md shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <Send /> {isEdit ? 'Update Blog' : 'Submit Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;