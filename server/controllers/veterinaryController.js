import Veterinary from "../models/veterinary.model.js";

export const getVeterinary = async (req, res) => {
  try {
    const veterinary = await Veterinary.find().lean();
    return res.status(200).json({
      count: veterinary.length,
      data: veterinary,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch supplies",
    });
  }
};
