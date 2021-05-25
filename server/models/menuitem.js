import mongoose from "mongoose";
const IngredientSchema = require("./ingredient");
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  ingredient: [
    {
      type: IngredientSchema,
      required: false,
    },
  ],
  image: { type: String, required: false },
  note: { type: String, required: false },
});

// const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
// module.exports = MenuItem;
module.exports = MenuItemSchema;

// {
//   "name": "Chicken Alfredo",
//   "description": "The best",
//   "ingredient": [
//     {
//         "name": "Honey",
//         "image": "./honey.png"
//     },
//     {
//         "name": "wax",
//         "image": "./wax.png"
//     }
//   ]
//   "image": "./chickalfredo.png",
// }
