import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
import adminUserStatusRoutes from "./routes/admin/adminUserStatusRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
import adminCategoryRoutes from "./routes/admin/adminCategoryRoutes.js";
import adminDashboardRoutes from "./routes/admin/adminDashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(express.json());

// ✅ CORS FIX (THIS IS THE KEY)
app.use(
  cors({
    origin: ["http://localhost:3000","https://ecommerce-frontend-indol-delta.vercel.app"], // frontend
    credentials: true,
  })
);

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/users", adminUserStatusRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);

/* ======================
   DB + SERVER
====================== */
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
