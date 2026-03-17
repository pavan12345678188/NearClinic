const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");

router.post("/register", async (req, res) => {
  try {

    const { name, email, password, specialization, clinicId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique doctor ID
    const count = await Doctor.countDocuments();
    const doctorId = "DOC-" + (1000 + count + 1);

    const doctor = await Doctor.create({
      doctorId,
      name,
      email,
      password: hashedPassword,
      specialization,
      clinicId
    });

    res.json({
      message: "Doctor registered",
      doctorId: doctor.doctorId
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;