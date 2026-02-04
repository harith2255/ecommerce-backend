import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../controllers/admin/adminProductController.js";

import { protect } from "../../middlewares/authMiddleware.js";
import { adminOnly } from "../../middlewares/adminMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);

export default router;
