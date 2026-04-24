import mongoose, { model, Schema } from "mongoose";

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    family: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Fish", "Mammal"],
    },

    category: {
      type: String,
      required: true,
      default: "pets",
    },

    type: {
      type: String,
      required: true,
      default: "pets",
    },

    age: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Pets = model("Pets", petSchema, "pets");
export default Pets;
