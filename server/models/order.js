import mongoose from "mongoose";
const MenuItemSchema = require("./menuitem");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  date: { type: String, required: false },
  menuItem: { type: MenuItemSchema, required: false },
  status: { type: String, required: false },
});

// const Order = mongoose.model("Order", OrderSchema);
// module.exports = Order;

module.exports = OrderSchema;

// {
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
// }
