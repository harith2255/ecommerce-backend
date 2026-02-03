import express from "express";
import {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
} from "../../controllers/admin/adminCategoryController.js";

import { protect } from "../../controllers/admin/middlewares/authMiddleware.js";
import { adminOnly } from "../../controllers/admin/middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/", getCategories);

export default router;