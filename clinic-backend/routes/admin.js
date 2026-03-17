const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Clinic = require("../models/clinic");
const auth = require("../middleware/auth");


// ==========================
// ADMIN REGISTER
// ==========================
router.post("/register", async (req, res) => {
  try {
    const {
      clinicName,
      address,
      city,
      area,
      phone,
      username,
      email,
      password,
    } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create clinic
    const clinic = await Clinic.create({
      clinicName,
      address,
      city,
      area,
      phone,
    });

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      clinicId: Clinic._id,
      role: "admin",
    });

    res.status(201).json({
      message: "Clinic registered successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ==========================
// ADMIN LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      "nearclinic_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        username: admin.username,
        email: admin.email,
        clinicId: admin.clinicId,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;