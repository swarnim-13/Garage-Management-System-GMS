import express from "express";
import cors from "cors";
import morgan from "morgan";

import inventoryRoutes from "./routes/inventoryRoutes.js";
import jobCardRoutes from "./routes/jobCardRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* Routes */
app.use("/api/inventory", inventoryRoutes);
app.use("/api/jobcards", jobCardRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/billing", billingRoutes);
/* Health Check */
app.get("/", (req, res) => {
  res.send("Garage Management API Running...");
});

export default app;