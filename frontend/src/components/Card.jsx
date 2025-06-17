import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { format } from 'date-fns';

const Card = (cardDetails) => {
      const {deleteBlog} = useAuth()
  const  navigate  = useNavigate()
   const handleReadMore=()=>{
    navigate('/detail-blog',{state:{cardDetails}})
   }
  return (
  <div className=" shadow  rounded-md text-xl">
  <div className="aspect-[2/1]">
    <img
      src={cardDetails.images[0]}
      alt="load.."
      className="w-full h-full object-cover rounded-t-md"
    />
  </div>
  <div className=" flex flex-col gap-2 p-4">
  <div className='flex justify-between italic'>  <h1 className="font-bold ">{cardDetails.title}</h1>  <span className='text-gray-400 '>{ cardDetails.createdAt?format(new Date(cardDetails.createdAt),'dd MMM yyyy, hh:mm a') : ''  }</span></div>
    <p className="text-justify leading-snug">{cardDetails.abstract} </p>
   <div className='flex justify-between items-center'>
     <p onClick={handleReadMore} className="text-blue cursor-pointer font-semibold underline text-blue-800">
      Read More
    </p>
    {cardDetails.isMyBlog && 
      <div className='flex  gap-4'>
         <button
        onClick={() =>
    navigate('/add-blog', { state: { isEdit: true, blogData:cardDetails , blogId:cardDetails.id } })
  }
        className='px-4 py-2 text-white font-bold bg-purple-600 cursor-pointer rounded-md'>Edit</button>
        <button onClick={async()=> await deleteBlog(cardDetails.id)}
         className='px-4 py-2 text-white font-bold bg-purple-600 cursor-pointer rounded-md'>Delete</button>
      </div>
    }
    
   </div>
  </div>
</div>

  )
}

export default Card
