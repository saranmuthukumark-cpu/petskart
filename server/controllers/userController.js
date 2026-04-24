import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const petskart = await User.find().lean();
    res.json(petskart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
