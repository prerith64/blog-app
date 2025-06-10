import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
const DetailBlog = () => {
  
    const  {state}  = useLocation();
    const blog = state.cardDetails;
   


  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white container mx-auto p-6 mb-24">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-6 space-y-6">
        {blog.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            className="w-full h-60 object-cover mb-4 rounded-md shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Modal for Full Image View */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 shadow hover:bg-gray-200"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[80vh] rounded-md shadow-lg"
            />
          </div>
        </div>
      )}
    
    <div className='mt-6 flex flex-col gap-6 font-sans'>
       <div className='flex justify-between'> <h1 className='text-4xl font-abold italic  '>{blog.title}</h1><span className='text-gray-600 text-xl '>{blog.createdAt
    ? format(new Date(blog.createdAt), 'dd MMM yyyy, hh:mm a')
    : ''} </span></div>
        <hr className='text-gray-400' />
        <p className='text-2xl text-justify '>{blog.abstract}</p>
        <p className='text-2xl text-justify '>{blog.description}</p>
    </div>

    </div>
  );
};

export default DetailBlog;
