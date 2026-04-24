import Livestock from "../models/livestocks.model.js";

export const getLivestock = async (req, res) => {
  try {
    const livestock = await Livestock.find().lean();

    return res.status(200).json({
      count: livestock.length,
      data: livestock,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch livestock",
    });
  }
};
