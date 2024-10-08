import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
