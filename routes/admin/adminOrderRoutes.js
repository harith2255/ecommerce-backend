import express from "express";
import {
  getOrders,
  updateOrderStatus,
  
} from "../../controllers/admin/adminOrderController.js";
import { protect } from "../../controllers/admin/middlewares/authMiddleware.js";
import { adminOnly } from "../../controllers/admin/middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getOrders);
router.get("/:id", updateOrderStatus);


export default router;