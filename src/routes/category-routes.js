import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import {verifyToken} from "../middleware/verify-token.js"
import {authorizeRoles} from "../middleware/roles-middleware.js"

export const categoryRouter = Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.get("/categories/:id", getCategory);
categoryRouter.post("/categories", verifyToken, authorizeRoles("admin", "user"), createCategory);
categoryRouter.delete("/categories/:id", verifyToken, authorizeRoles("admin", "user"), deleteCategory);
categoryRouter.put("/categories/:id", verifyToken, authorizeRoles("admin", "user"), updateCategory);
categoryRouter.patch("/categories/:id", verifyToken, authorizeRoles("admin", "user"), editCategory);
