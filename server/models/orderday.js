import mongoose from "mongoose";
const OrderSchema = require("./order");
const { Schema } = mongoose;

const OrderDaySchema = new Schema({
  date: { type: String, required: true },
  menu1: { type: OrderSchema, required: true },
  menu2: { type: OrderSchema, required: true },
  menu3: { type: OrderSchema, required: true },
  bool1: { type: Boolean, required: true },
  bool2: { type: Boolean, required: true },
  bool3: { type: Boolean, required: true },
});

// const OrderDay = mongoose.model("OrderDay", orderDaySchema);
// module.exports = OrderDay;

module.exports = OrderDaySchema;

// {
//   "date": "12022021",
//   "menu1": {
//   "date": "02122022",
//   "menuItem":
//     {
//   "title": "Chicken Alfredo",
//   "description": "The best",
//   "ingredient": [
//     {
//         "title": "Honey",
//         "image": "./honey.png"
//     },
//     {
//         "title": "wax",
//         "image": "./wax.png"
//     }
//   ],
//   "image": "./chickalfredo.png",
//     }
//   "status": "in progress"
// },
//   "menu2": {
//   "date": "02122022",
//   "menuItem":
//     {
//   "title": "Lentil Soup",
//   "description": "The second best",
//   "ingredient": [
//     {
//         "title": "Honey",
//         "image": "./honey.png"
//     },
//     {
//         "title": "wax",
//         "image": "./wax.png"
//     }
//   ],
//   "image": "./lentilsoup.png",
//     }
//   "status": "not started"
// },
// "menu3": {
//   "date": "02122022",
//   "menuItem":
//     {
//   "title": "Steak and Potatoes",
//   "description": "The third best",
//   "ingredient": [
//     {
//         "title": "Honey",
//         "image": "./honey.png"
//     },
//     {
//         "title": "wax",
//         "image": "./wax.png"
//     }
//   ],
//   "image": "./steakpotatoes.png",
//     }
//   "status": "not started"
// },
// "bool1": "true",
// "bool2": "true",
// "bool3": "true"
// }
