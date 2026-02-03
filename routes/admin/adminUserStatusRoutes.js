import express from "express";
import {
    getUsers,
    toggleUserBlock,
} from "../../controllers/admin/adminUserController.js";
import { protect } from "../../controllers/admin/middlewares/authMiddleware.js";
import { adminOnly } from "../../controllers/admin/middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getUsers);

router.put("/:id/status", toggleUserBlock);

export default router;