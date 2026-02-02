import User from "../../models/User.js";
import Order from "../../models/Order.js";
import Products from "../../models/Products.js";

export const getDashboardStats = async (req, res) => {
    try {
        const users = await User.countDocuments();
        const orders = await Order.countDocuments();
        const products = await Products.countDocuments();

        const revenueAgg = await Order.aggregate([
            {$group:{_id:null, total:{$sum:"$total"}}}
        ]);
        res.json({
            users,
            orders,
            products,
            revenue:revenueAgg[0].total || 0,
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
}