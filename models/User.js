import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role:{
            type:String,
            default:"customer",
            enum:["customer","admin"]
        },

        isActive:{
            type:Boolean,
            default:true,
        },

        lastLogin:Date
         },
     {
            timestamps: true,
        }
)

export default mongoose.model("User",userSchema)