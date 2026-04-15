import express from "express";
import cors from "cors";
import "./utils/loadEnvironment.js";
import db from "./db/connection.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "./middleware/auth.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SERVER is running....." });
});

app.get("/petskart", async (req, res) => {
  try {
    const petskart = await db.collection("users").find().toArray();
    res.json(petskart);
  } catch (error) {
    console.error("Error fetching petskart:", error);
    res.status(500).json({ error: "Failed to fetch petskart" });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: bcrypt.hashSync(password, 5) });

    res.json({
      message: `Hello👋 ${name}, you have registered successfully `,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed register " });
  }
});

// createlogin user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({ error: "Enter input" });
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // user info
    const role = user.role || "user";
    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "Lax",
      path: "/",
    });

    res.json({ message: `logged in successfully`, token, role });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ error: "Failed to login user", errorMessage: error.message });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  const loggedInUser = req.user;

  console.log("Logged in user:", loggedInUser);

  try {
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(loggedInUser.id) },
        { projection: { password: 0 } },
      );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
});

// route
app.get("/", authMiddleware, (req, res) => {
  const loggedInUser = req.user;

  res.json({
    user: loggedInUser,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
