import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect("mongodb://localhost/product")
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
};
