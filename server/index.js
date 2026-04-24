import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import "./utils/loadEnvironment.js";
import "./db/connection.js";
import authRoutes from "./routers/auth.route.js";
import userRoutes from "./routers/user.route.js";
import Livestock from "./routers/livestocks.route.js";
import PetsRoutes from "./routers/pets.route.js";
import Pharmacy from "./routers/pharmacy.route.js";
import Supplies from "./routers/supplies.route.js";
import Veterinary from "./routers/veterinary.route.js";
import OrdersRoutes from "./routers/order.route.js";
import adminListingRoutes from "./routers/adminList.route.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const uploadsDir = path.join(import.meta.dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use("/uploads", express.static(uploadsDir));

app.get("/", (req, res) => res.json({ message: "SERVER is running" }));


app.use("/users", userRoutes);
//livestocks
app.use("/livestocks", Livestock);
//pets
app.use("/pets", PetsRoutes);
//pharmacy
app.use("/pharmacy", Pharmacy);
//supplies
app.use("/supplies", Supplies);
//veterinary
app.use("/veterinary", Veterinary);
//orders
app.use("/orders", OrdersRoutes);
//auth
app.use("/", authRoutes);




//admin listings
app.use("/adminlist", adminListingRoutes);

app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
});
