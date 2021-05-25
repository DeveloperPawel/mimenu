import mongoose from "mongoose";
const IngredientSchema = require("./ingredient");
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredient: [
    {
      type: IngredientSchema,
      required: false,
    },
  ],
  image: { type: String, required: true },
  note: { type: String, required: false },
});

export default mongoose.model("MenuItem", MenuItemSchema);
