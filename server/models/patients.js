import mongoose from "mongoose";
const OrderDaySchema = require("./orderday");
const IngredientSchema = require("./ingredient");
const RestrictionSchema = require("./restriction");
const { Schema } = mongoose;

const patientSchema = new Schema({
  id: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  endDate: {
    type: String,
    required: true,
  },
  restriction: {
    type: String,
    default: "Regular",
  },
  menuOrders: {
    type: [OrderDaySchema],
    required: false,
  },
  role: {
    type: String,
    default: "patient",
  },
});

export default mongoose.model("Patient", patientSchema);

// ingredients
// calender
// menu item
// mechanical soft
// gi soft
// low fiber
// low sodium
// cholesterol-restricted
// vegetarian
