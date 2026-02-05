import Order from "../models/Order.js";

export const getUserOrders = async (req, res) => {
    try {
        // security check 
        if(req.user._id.toString() !== req.params.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to orders",
            });
        }

        const orders = await Order.find({ user: req.params.userId }).sort({
            createdAt: -1,
        });
        res.status(200).json({orders});
    } catch (error) {
       console.error(error);
       res.status(500).json({
           success: false,
           message: "Failed to fetch orders",
       });
    }
}

export const createOrder = async (req,res) => {
    try {
        const{
            items,
            subtotal,
            tax,
            shipping,
            total,
            paymentMethod,
            shippingAddress
        }= req.body;

        if(!items || items.length ===0){
            return res.status(400).json({
                success:false,
                message:"No items in the order"
            });
        }

        const order = await Order.create({
            user:req.user._id,
            items:items.map(item => ({
                productId:item._id,
                name:item.name,
                quantity:item.quantity,
                price:item.price,
                image:item.image
            })),
            subtotal,
            tax,
            shipping,
            total,
            paymentMethod,
            shippingAddress
        });

        res.status(201).json({
            success:true,
            message:"Order created successfully",
            order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
}
