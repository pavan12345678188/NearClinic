const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  clinicId: 
  {type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  role: { type: String, default: "admin" },
});

module.exports = mongoose.model("Admin", adminSchema);