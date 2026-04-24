import mongoose, { model, Schema } from "mongoose";

const veterinarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    clinic: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid phone number"],
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter valid email"],
    },

    image: {
      type: String,
      required: true,
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    available: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Veterinary = model("Veterinary", veterinarySchema, "veterinary");
export default Veterinary;
