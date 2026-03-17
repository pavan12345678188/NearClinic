const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: String,
  name: String,
  email: String,
  password: String,
  specialization: String,
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic"
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);