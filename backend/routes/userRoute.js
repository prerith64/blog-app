import express from 'express'
import {login, logout, me, signup} from '../controllers/userController.js'
import { authMidelware } from '../midelwares/authMidelware.js';
const userRoute = express.Router()

userRoute.post('/login',login);
userRoute.post('/signup',signup);
userRoute.get('/logout',logout)
userRoute.get('/me',authMidelware,me);

export default  userRoute;