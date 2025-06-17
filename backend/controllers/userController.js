import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword)
      return res.status(409).json({ success: false, message: "password doesnot match" });

    const user = await userModel.findOne({email});

    if (user)
      return res.status(409).json({ success: false, message: "user already exists" });
    
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newuser = new userModel({
        username,
        email,
        password:hashedPassword,
    })
       
    await newuser.save()

    res.status(201).json({ message: 'User registered successfully' });
  
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const login = async(req,res) => {
 const {email, password} = req.body;
 
try {
     const user = await userModel.findOne({email});

     if(!user) return res.status(404).json({success:false,message:"User not found"})
     if(!await bcrypt.compare(password,user.password)) return res.status(401).json({success:false,message:"Invalid credentials"})

     const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{
        expiresIn:"4d"
     });

     res.cookie("token",token,{
        httpOnly:true,
        sameSite:'None',
        maxAge:4*24*60*60*1000,
        secure:true
     })
        
     
    return res.status(201).json({success:true,token,message:"login successful"})
} catch (error) {
     console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
}
};

export const me = async (req, res) => {
  // req.user is set by authMidelware
  return res.json({ success: true, id: req.user.id })
}


export const logout = async(req,res) => {
res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
   return res.json({ message: 'Logged out' });
}
