import React from 'react'
import Card from '../components/Card'
import { useAuth } from '../context/AuthContext'

const MyBlogs = () => {
  const {blogPosts,userId} =  useAuth()
 
  const userBlogs = blogPosts.filter(blog => blog.createdBy === userId)

  return (
    <div  className='container m-auto bg-white p-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-6  '>
     {userBlogs.map((item,index)=>(
         <Card key={index} 
         images={item.images} 
         title={item.title}
         id={item._id}
         createdAt={item.createdAt}
         abstract={item.abstract} 
          description={item.description}
          isMyBlog={true} />
     ))}
    </div>
  )
}

export default MyBlogs
