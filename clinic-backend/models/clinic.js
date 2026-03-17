const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  city: String,
  area: String
});

module.exports = mongoose.model("Clinic", clinicSchema);
