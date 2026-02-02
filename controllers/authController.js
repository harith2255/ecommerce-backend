import User from "../models/User.js "
import { hashPassword,comparePassword } from "../utils/password.js"
import { generateToken } from "../utils/jwt.js"
import logger from "../config/logger.js"


// register
export const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
  console.log("REGISTER API HIT");
  console.log("BODY:", req.body);
        // validation
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if (password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 6 characters"
            })

        }

        // check existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
            }

            // create user

            const user = await User.create({
                name,
                email,
                password:await hashPassword(password)
            })

            // generate token
            const token = generateToken(user);

            logger.info("User registered",{userId:user._id});

            // response
            return res.status(201).json({
                success:true,
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            })

            
    } catch (error) {
        logger.error("Register failed",{
            message:error.message,
            stack:error.stack
        });

        return res.status(500).json({
            success:false,
            message:"Registration failed"
        });
    
        
    }
}

// login
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        // validation
        if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        });
        }

        // find user
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"invalid email or password"
            })
        }

    //    check account status
    if(!user.isActive){
        return res.status(401).json({
            success:false,
            message:"Account is not active"
        })
    }
    // compare password
    const isMatch = await comparePassword(password,user.password);
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password"
        })
    }
    // generate token
    const token = generateToken(user);

    user.lastLogin = Date.now();
    await user.save();

    logger.info("User logged in",{userId:user._id});

    // response
    return res.status(200).json({
        success:true,
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    });
    } catch (error) {
        logger.error("Login failed",{
            message:error.message,
            stack:error.stack
        });

        return res.status(500).json({
            success:false,
            message:"Login failed"
        });
        
        
    }
}