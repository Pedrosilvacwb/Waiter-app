import { model, Schema } from "mongoose";

export const User = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Admin", "Waiter"],
      default: "Waiter",
    },
  })
);
