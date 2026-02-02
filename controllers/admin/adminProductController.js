import Product from "../../models/Products.js";
// POST /api/admin/products
export const createProduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.body.productCode) {
      req.body.productCode = `PRD-${Date.now()}`;
    }
    const product = await Product.create({
      productCode: req.body.productCode,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image,
      isActive: req.body.isActive ?? true,
      brand: req.body.brand,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
      error: error.code === 11000
        ? "Product code already exists"
        : error.message,
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product deletion failed",
    });
  }
};
