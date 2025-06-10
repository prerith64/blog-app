import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import { connectDb } from './configdb/connectDb.js'
import blogRoute from './routes/blogRoute.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL , // or your frontend domain
  credentials: true, // allow cookies
}));


app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api/user',userRoute);
app.use('/api/blog',blogRoute);

await connectDb();

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
