import express from "express";
import env from "dotenv";
import { useRouter } from "./routes/user-routes.js";
import { dbConnect } from "./config/db-connection.js";
import { categoryRouter } from "./routes/category-routes.js";
import { productRouter } from "./routes/product-routes.js";

env.config();

const app = express();

app.use(express.json());

// user routes
app.use("/api/v1", useRouter);
// category routes
app.use("/api/v1", categoryRouter);

// product routes
app.use("api/v1", productRouter);

// db

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
