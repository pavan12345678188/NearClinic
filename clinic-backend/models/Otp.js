const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  mobile: String,
  otp: String,
  expiresAt: Date,
  isUsed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Otp", otpSchema);
