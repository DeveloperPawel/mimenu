import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 10,
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: String,
      enum: ["HealthProvider", "Admin", "Cook"],
      required: true,
      default: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
