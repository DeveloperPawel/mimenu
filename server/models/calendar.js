import mongoose from "mongoose";
const DaySchema = require("./day");
const { Schema } = mongoose;

const calendarSchema = new Schema({
  name: { type: String, required: true },
  numDays: { type: Number, required: true },
  days: { type: [DaySchema], required: true },
});

export default mongoose.model("Calendar", calendarSchema);

// {
//   "name": "May",
//   "numDays": 30,
//   "days": [
//     {
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
//   ]
// }
