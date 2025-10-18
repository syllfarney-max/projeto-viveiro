import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import messageRoutes from "./routes/messageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

// Routes
app.use("/api/messages", messageRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Viveiro Comurg Backend is running ✅");
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
