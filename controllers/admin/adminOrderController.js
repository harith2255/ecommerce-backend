import Order from "../../models/Order.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await (await Order.find()
        .populate("user", "name email"))
        .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status" });
        
    }
}