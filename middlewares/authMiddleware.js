import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../config/logger.js";

export const protect = async(req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"Authorization token missing or invalid"
            })
        }

        const token = authHeader.split(" ")[1];
// verify token
let decoded;
try {
    decoded = jwt.verify(token,process.env.JWT_SECRET);
} catch (err) {
    logger.warn("JWT verifation failed",{
        error:err.message,
        ip:req.ip
    })
    return res.status(401).json({
        success:false,
        message:"Invalid token"
    })
}
    // fetch user
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }

    // check user status
    if(!user.isActive){
        return res.status(401).json({
            success:false,
            message:"User is not active"
        })
    }
    req.user = user;
    next();
    } catch (error) {
        logger.error("Auth middleware error",{
           message:error.message,
           stack:error.stack
        });

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
