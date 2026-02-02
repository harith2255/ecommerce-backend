import express from "express";
import {
  getOrders,
  updateOrderStatus,
  
} from "../../controllers/admin/adminOrderController.js";
import { protect } from "../../middlewares/authMiddleware.js";
import { adminOnly } from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getOrders);
router.get("/:id", updateOrderStatus);


export default router;