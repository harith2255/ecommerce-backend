import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
    try {
    const categories = await Category.find({ isActive:true }).sort({ name: 1 }).select("name slug");
    res.json(categories);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
}