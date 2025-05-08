import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js"; // <-- Add this
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // <-- Move task routes here

sequelize.sync().then(() => {
  console.log("DB synced");
});

export default app;
