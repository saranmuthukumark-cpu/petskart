import Pets from "../models/pets.model.js";

export const getPets = async (req, res) => {
  try {
    const pets = await Pets.find().lean();
    return res.status(200).json({
      count: pets.length,
      data: pets,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
    });
  }
};
