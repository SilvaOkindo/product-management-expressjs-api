import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController";

export const productRouter = Router();

productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProduct);
productRouter.post("/products", createProduct);
productRouter.put("/products", updateProduct);
productRouter.patch("/products/:id", editProduct);
productRouter.delete("/products/:id", deleteProduct);
