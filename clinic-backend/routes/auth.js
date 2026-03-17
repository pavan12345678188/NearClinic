const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp");
const Patient = require("../models/Patient");
const generateOtp = require("../utils/generateOtp");
const bcrypt = require("bcrypt");

// ─── SEND OTP ──────────────────────────────────────────────
router.post("/send-otp", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile required" });
    }

    const otp = generateOtp();

    // Delete any old OTPs for this mobile
    await Otp.deleteMany({ mobile });

    await Otp.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      isUsed: false,
    });

    console.log(`OTP for ${mobile}: ${otp}`);

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ─── VERIFY OTP ────────────────────────────────────────────
router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const record = await Otp.findOne({
      mobile,
      otp,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    record.isUsed = true;
    await record.save();

    res.json({ message: "OTP verified", token: "otp-verified-" + mobile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── REGISTER ──────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password required" });
    }

    const existing = await Patient.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Patient({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ─── LOGIN ─────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await Patient.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login success",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
