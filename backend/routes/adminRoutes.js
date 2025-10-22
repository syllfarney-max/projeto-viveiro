import express from "express";
import { getMessages } from "../db.js";

const router = express.Router();

const ADMIN_USER = "sjpda";
const ADMIN_PASS = "12345";

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, token: "admin_token" });
  }
  return res.json({ success: false });
});

router.get("/messages", (req, res) => {
  const messages = getMessages();
  res.json(messages);
});

export default router;
