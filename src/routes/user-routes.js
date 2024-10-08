import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verify-token.js";

export const useRouter = Router();

useRouter.post("/users/register", registerUser);
useRouter.post("/users/login", login);
useRouter.get("/users", getAllUsers);
useRouter.get("/users/:id", getUserById);
useRouter.post("/users/:id", deleteUser);
useRouter.put("/users/:id", updateUser);
