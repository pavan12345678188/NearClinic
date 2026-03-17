import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles/global.css";
import Navbar from "./Navbar";
import { bookAppointment } from "./api/authApi";

function AppointmentForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const clinic = location.state?.clinic;
  const slot = location.state?.slot;

  const [form, setForm] = useState({
    patient_name: "",
    mobile: "",
    problem: "",
  });

  if (!clinic) return <p>No clinic selected. <span style={{cursor:"pointer",color:"blue"}} onClick={() => navigate("/AreaSelection")}>Go back</span></p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await bookAppointment({
      ...form,
      clinic_id: clinic.id,
      city: clinic.city,   // important for professional token
      area: clinic.area,   // important
      time: slot,
      date: today,
    });

    console.log("SERVER RESPONSE:", response.data);

    navigate("/success", {
      state: {
        success: true,
        clinic,
        slot,
        token: response.data.token,   // 🔥 FIX HERE
      },
    });

  } catch (err) {
    console.error(err);
    alert("Booking failed. Please try again.");
  }
};


  return (
    <>
      <Navbar showBack={true} showlogin={false} />
      <div className="center-card">
        <h2>Confirm Appointment</h2>

        <div className="clinic-box">
          <h3>{clinic.name}</h3>
          <p>{clinic.address}</p>
          <span className="slot-badge">{slot}</span>
        </div>

        <motion.form onSubmit={handleSubmit} className="form">
          <input
            name="patient_name"
            placeholder="Patient Name"
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />

          <textarea
            name="problem"
            placeholder="Symptoms / Problem (optional)"
            onChange={handleChange}
            style={{ padding: "10px", marginBottom: "14px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" }}
          />

          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </motion.form>
      </div>
    </>
  );
}

export default AppointmentForm;
