import express from "express";
import { saveMessage } from "../db.js";

const router = express.Router();

router.post("/send", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, error: "Campos obrigatórios ausentes." });
  }
  saveMessage({ name, email, message });
  return res.json({ success: true });
});

export default router;
