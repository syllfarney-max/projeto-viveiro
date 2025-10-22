import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend rodando na porta ${PORT}`));
