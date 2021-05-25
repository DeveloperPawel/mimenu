import mongoose from "mongoose";
const MenuItemSchema = require("./menuitem");
const { Schema } = mongoose;

const DaySchema = new Schema({
  date: { type: String, required: true },
  menu1: { type: [MenuItemSchema], required: false },
  menu2: { type: [MenuItemSchema], required: false },
  menu3: { type: [MenuItemSchema], required: false },
});

export default mongoose.model("Day", DaySchema);

// {
//     "date": "12",
//     "menu1": [
//         {
//   "name": "Eggs and Potatoes",
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "Egg and cheese Omelette",
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "Buttered Toast",
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
//   ],
//   "image": "./chickalfredo.png",
// }
//     ],
//     "menu2": [
//         {
//   "name": "Ham Sandwich",
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "Peanut Butter and grape jelly",
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "Chicken Burrito",
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
//   ],
//   "image": "./chickalfredo.png",
// }
//     ],
//     "menu3": [
//         {
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "Pesto Pasta",
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
//   ],
//   "image": "./chickalfredo.png",
// },
// {
//   "name": "New York Ribeye",
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
//   ],
//   "image": "./chickalfredo.png",
// }
//     ]
// }
