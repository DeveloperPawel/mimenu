import mongoose from "mongoose";
const MenuItemSchema = require("./menuitem");
const { Schema } = mongoose;

const DaySchema = new Schema({
  date: { type: String, required: true },
  menu1: { type: [MenuItemSchema], default: undefined },
  menu2: { type: [MenuItemSchema], default: undefined },
  menu3: { type: [MenuItemSchema], default: undefined },
});

// const Day = mongoose.model("Day", DaySchema);
// module.exports = Day;

module.exports = DaySchema;

// {
//   "date": "12232021",
//   "menu1": [
//     {
//   "name": "Eggs and toast",
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
// },
// {
//   "name": "Fruit Parfet",
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
//   ],
//   "menu2": [
//     {
//   "name": "Quasidilla",
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
// },
// {
//   "name": "Ham sandwich",
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
//   ],
//   "menu3": [
//     {
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
// },
// {
//   "name": "Lentil Soup",
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
//   ],
// }
