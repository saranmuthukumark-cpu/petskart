import Pharmacy from "../models/pharmacy.model.js";

export const getPharmacy = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.find().lean();
    return res.status(200).json({
      count: pharmacy.length,
      data: pharmacy,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
    });
  }
};
