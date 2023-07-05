import { model, Schema } from "mongoose";

export const Ingredient = model(
  "Ingredient",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  })
);
