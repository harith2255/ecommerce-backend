import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        items:[
            {
                productId: mongoose.Schema.Types.ObjectId,
                name: String,
                quantity: Number,
                price: Number,
                image: String,
            }
        ],
        total: Number,
        status:{
            type:String,
            enum:["pending","processing","shipped","delivered","cancelled"],
            default:"pending"
        },
        paymentMethod:String,
        shippingAddress:{
            fullName:String,
            address:String,
            city:String,
            zipCode:String,
            phone:String,
        },
    },
    {timestamps:true}
    );

    export default mongoose.model("Order",orderSchema);
   