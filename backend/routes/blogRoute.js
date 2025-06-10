import express from 'express'
import { addBlog, getBlog,updateBlog,deleteBlog } from '../controllers/blogController.js';
import { authMidelware } from '../midelwares/authMidelware.js';

const  blogRoute = express.Router()

blogRoute.post('/add',authMidelware, addBlog);
blogRoute.get('/all', authMidelware,getBlog);
blogRoute.put('/update/:id', authMidelware,updateBlog);   // 👈 update by ID
blogRoute.delete('/delete/:id',authMidelware,deleteBlog)

export default  blogRoute;