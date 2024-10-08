import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    categoryNAme: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Model", categorySchema);
