import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import "./Landingpage.css";
import doctorImg from "./assets/doctor.png";
import Navbar from "./Navbar.jsx";

function Landingpage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBookAppointment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/AreaSelection");
    }
  };

  return (
    <>
      <Navbar showBack={false} />

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-left">
          <span className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </span>
        </div>

        <div className="nav-center">
          <h1 className="nav-logo_text">NearClinic 🩺</h1>
        </div>

        <div className="nav-right">
          <ul className="nav-desktop">
            <li onClick={() => navigate("/Home")}>Home</li>
            <li onClick={() => navigate("/services")}>Services</li>
            <li onClick={() => navigate("/howitworks")}>How it Works</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
          <button className="login-btn" onClick={() => navigate("/select-login")}>
            Login
          </button>
        </div>
      </nav>

      {/* ================= MOBILE SIDE MENU ================= */}
      {menuOpen && (
        <>
          <div className="overlay" onClick={() => setMenuOpen(false)} />
          <div className="side-menu">
            <span className="close-btn" onClick={() => setMenuOpen(false)}>
              ×
            </span>
            <a onClick={() => navigate("/Home")}>Home</a>
            <a onClick={() => navigate("/services")}>Services</a>
            <a onClick={() => navigate("/howitworks")}>How it Works</a>
            <a onClick={() => navigate("/contact")}>Contact</a>
            <a onClick={() => navigate("/select-login")}>Login</a>
          </div>
        </>
      )}


      {/* ================= HERO SECTION (UNCHANGED) ================= */}
      <section className="intro-section">
        <motion.div
          className="intro-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="intro-text">
            <h1 className="subtitle-text">Find trusted clinics near you</h1>
            <h1 className="main-title">Consultation starts at just ₹100</h1>

            <h2>Book Clinic Appointments Near You</h2>

            <p className="intro-para">
              NearClinic helps patients find trusted clinics in their nearby
              areas and book appointments easily without waiting in queues.
            </p>

            <p>
              A simple and reliable platform designed to make healthcare access
              faster and more convenient.
            </p>

            <div className="intro-button">
              <button onClick={handleBookAppointment}>
                Book Appointment
              </button>
            </div>
          </div>

          <div className="doctor-circle">
            <img src={doctorImg} alt="Doctor" />
          </div>
        </motion.div>
      </section>

      {/* ================= PROBLEM SECTION ================= */}
      <section className="lp-section">
        <h2>Healthcare Shouldn’t Be Complicated</h2>
        <p>
          Finding nearby clinics, verifying trust, and waiting for long hours
          just to consult a doctor is still a challenge for many patients.
          Offline appointment systems often waste valuable time.
        </p>
      </section>

      {/* ================= APPROACH SECTION ================= */}
      <section className="lp-section light_row">
        <h2>A Smarter Way to Access Healthcare</h2>
        <p>
          NearClinic focuses on simplifying the connection between patients and
          clinics. Our approach emphasizes accessibility, reliability, and
          time-efficiency without complicating healthcare decisions.
        </p>
      </section>

      {/* ================= ADVANTAGES ================= */}
      <section className="lp-section">
        <h2>Why NearClinic Exists</h2>
        <div className="lp-cards">
          <div className="lp-card">📍 Location-based clinic discovery</div>
          <div className="lp-card">⏱ Time-saving appointment access</div>
          <div className="lp-card">🏥 Trusted clinic presence</div>
          <div className="lp-card">👥 Patient-friendly design</div>
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}
      <section className="lp-section light">
        <h2>Built for Everyday Healthcare Needs</h2>
        <div className="lp-cards">
          <div className="lp-card">Patients seeking quick care</div>
          <div className="lp-card">Families managing health visits</div>
          <div className="lp-card">Local clinics moving digital</div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="lp-section">
        <h2>Trust Is the Foundation</h2>
        <p>
          NearClinic is built with a strong focus on patient convenience and
          responsible clinic representation, supporting smoother healthcare
          interactions.
        </p>
      </section>

      {/* ================= VISION ================= */}
      <section className="lp-section light_row">
        <h2>Designed for a Better Healthcare Experience</h2>
        <p>
          NearClinic is evolving to improve healthcare accessibility while
          maintaining simplicity and reliability.
        </p>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="lp-cta">
        <h2>Your Time Deserves Better Care</h2>
        <p>Start your journey towards hassle-free clinic access today.</p>
        <div className="cta-actions">
          <button onClick={handleBookAppointment}>
            Book Appointment
          </button>
          <button onClick={() => navigate("/contact")}>
            Contact Clinic
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="lp-footer">
        © 2026 NearClinic — Connecting patients with trusted clinics
      </footer>
    </>
  );
}

export default Landingpage;
