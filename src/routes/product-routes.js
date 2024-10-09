import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  searchProducts,
  updateProduct,
} from "../controllers/productController.js";

import { verifyToken } from "../middleware/verify-token.js";
import { authorizeRoles } from "../middleware/roles-middleware.js";

export const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProduct);
productRouter.get("/products/category/:categoryId", getProductsByCategory)
productRouter.post("/products", verifyToken, authorizeRoles("admin", "user"), createProduct);
productRouter.post("/products/search", searchProducts)
productRouter.put("/products/:id", verifyToken, authorizeRoles("admin", "user"), updateProduct);
productRouter.patch("/products/:id", verifyToken, authorizeRoles("admin", "user"), editProduct);
productRouter.delete("/products/:id", verifyToken, authorizeRoles("admin", "user"), deleteProduct);

