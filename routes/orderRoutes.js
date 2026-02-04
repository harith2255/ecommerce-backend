import express from "express";

import { getUserOrders, createOrder} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.post("/", createOrder);
router.get("/user/:userId", getUserOrders);

export default router;