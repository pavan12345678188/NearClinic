const express = require("express");
const router = express.Router();
const year = new Date().getFullYear();




let appointments = [];
// ─── BOOK APPOINTMENT ──────────────────────────────────────────────
router.post("/book-appointment", (req, res) => {
  const {
    clinicId,
    clinic_id,
    patientName,
    patient_name,   // 👈 ADD THIS
    name,
    mobile,
    phone,
    date,
    time,
  } = req.body;

  const finalClinicId = clinicId || clinic_id;
  const finalName = patientName || patient_name || name;   // 👈 FIX
  const finalMobile = mobile || phone;

 // Generate city + area code from clinic
const cityCode = (req.body.city || "CITY")
  .substring(0, 3)
  .toUpperCase();

const areaCode = (req.body.area || "AREA")
  .substring(0, 3)
  .toUpperCase();

// Count appointments for same clinic today
const today = new Date().toISOString().split("T")[0];

const todayAppointments = appointments.filter(
  (a) => a.clinicId === finalClinicId && a.date === today
);

const serialNumber = todayAppointments.length + 1;

const paddedSerial = String(serialNumber).padStart(4, "0");

const professionalToken = `${cityCode}-${areaCode}-${year}-${paddedSerial}`;


  if (!finalClinicId || !finalName || !finalMobile) {
    return res.status(400).json({
      message: "Missing required fields",
      received: req.body,
    });
  }

  const newAppointment = {
    id: Date.now(),
    token:professionalToken,
    clinicId: finalClinicId,
    patientName: finalName,
    mobile: finalMobile,
    date,
    time,
  };

  appointments.push(newAppointment);

  res.json({
    message: "Appointment booked successfully",
    token: professionalToken,
    appointment: newAppointment,
  });
});


module.exports = router;