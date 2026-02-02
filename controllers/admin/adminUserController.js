import User from "../../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
        
    }

}

export const toggleUserBlock = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.status = user.status ==="blocked" ? "active" : "blocked";
        await user.save();
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Failed to toggle user status" });
    }
}