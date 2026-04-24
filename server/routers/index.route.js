import express from "express";
import authRouter from "..routers/authRouter";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

router.use("/", authRouter);

export default router;
