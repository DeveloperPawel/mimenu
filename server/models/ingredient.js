import mongoose from "mongoose";
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  name: { type: String, required: false },
  image: { type: String, required: false },
});

// const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = IngredientSchema;

// {
//   "name": "milk",
//   "image": "./quartofmilk"
// }
