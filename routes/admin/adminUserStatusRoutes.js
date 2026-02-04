import express from "express";
import {
    getUsers,
    toggleUserBlock,
} from "../../controllers/admin/adminUserController.js";
import { protect } from "../../middlewares/authMiddleware.js";
import { adminOnly } from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getUsers);

router.put("/:id/status", toggleUserBlock);

export default router;