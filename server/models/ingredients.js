import mongoose from "mongoose";
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model("Ingredient", IngredientSchema);
