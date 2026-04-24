import Supplies from "../models/supplies.model.js";

export const getSupplies = async (req, res) => {
  try {
    const supplies = await Supplies.find().lean();
    return res.status(200).json({
      count: supplies.length,
      data: supplies,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch supplies",
    });
  }
};
