const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Patient", patientSchema);
