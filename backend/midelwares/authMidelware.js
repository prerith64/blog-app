import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export const authMidelware = async(req,res,next) =>{
try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    
    const decoded= jwt.verify(token,process.env.SECRET_KEY);
    
    req.user = decoded;

    next()
    
} catch (error) {
     return res.status(401).json({ success: false, message: "Invalid or expired token." });
}

}