const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Body parser FIRST
app.use(express.json());

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
const authRoutes = require("./routes/auth");
const clinicRoutes = require("./routes/clinics");
const appointmentRoutes = require("./routes/appointments");
const adminRoutes = require("./routes/admin");



app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api", appointmentRoutes);
app.use("/admin", require("./routes/admin"));
app.use("/admin", adminRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({ message: "Node backend running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
