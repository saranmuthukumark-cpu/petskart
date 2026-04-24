import mongoose, { model, Schema } from "mongoose";

const livestockSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },

    animal: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    price_inr: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      village: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
    },

    owner: {
      name: {
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

const Livestock = model("Livestocks", livestockSchema, "livestocks");

export default Livestock;
