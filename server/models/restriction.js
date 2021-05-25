import mongoose from "mongoose";
const IngredientSchema = require("./ingredient");
const { Schema } = mongoose;

const RestrictionSchema = new Schema({
  name: { type: String, required: true },
  ingredient: { type: [IngredientSchema], required: true },
});

// const Restriction = mongoose.model("Restriction", RestrictionSchema);
// module.exports = Restriction;

module.exports = RestrictionSchema;

// {
//   "name": "dairy",
//   "ingredient" :[{
//   "title": "milk",
//   "image": "./quartofmilk.png"
//   },
//   {
//     "title": "butter",
//     "image": "./butter.png"
//   }]
// }
