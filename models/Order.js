import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
            items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    subtotal:{
            type:Number,
            required:true
    },
    tax:{

            type:Number,
            required:true
    },
    shipping:{
            type:Number,
            required:true
    },
    total:{
            type:Number,
            required:true
    },

        status:{
            type:String,
            enum:["pending","processing","shipped","delivered","cancelled"],
            default:"pending"
        },
       paymentMethod: {
      type: String,
      enum: ["credit-card", "paypal", "cod"],
      required: true,
    },

     shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      zipCode: String,
      phone: String,
    },

    },
    
    {timestamps:true}
    );

    export default mongoose.model("Order",orderSchema);
   