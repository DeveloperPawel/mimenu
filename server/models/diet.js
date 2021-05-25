import mongoose from "mongoose";
const IngredientSchema = require("./ingredient");
const { Schema } = mongoose;

const DietSchema = new Schema({
  name: { type: String, required: true },
  ingredient: [{ type: IngredientSchema, required: false }],
});

export default mongoose.model("Diet", DietSchema);
