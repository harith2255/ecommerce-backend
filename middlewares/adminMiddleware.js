// middlewares/adminMiddleware.js
import logger from "../config/logger.js";

export const adminOnly = (req, res, next) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }
    
    if (req.user.role !== "admin") {
      logger.warn("Unauthorized admin access attempt", {
        userId: req.user._id,
        role: req.user.role,
        ip: req.ip
      });

      return res.status(403).json({
        success: false,
        message: "Admin access only"
      });
    }

    // ✅ User is admin
    next();
  } catch (error) {
    logger.error("Admin middleware error", {
      message: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      success: false,
      message: "Authorization failed"
    });
  }
};
