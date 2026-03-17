/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Home.css";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar showBack={true} />

      <div className="page-container">
        <div className="home-page">

          <motion.div className="home-top-cta">
            <button
              className="home-book-btn"
              onClick={() => navigate("/AreaSelection")}
            >
              Book Appointment
            </button>
          </motion.div>





      {/* HERO */}
      <section className="home-hero">
        <motion.div
          className="home-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome to NearClinic 🩺</h1>
          <p>
            A digital platform designed to simplify clinic discovery,
            appointment management, and healthcare access.
          </p>
        </motion.div>
      </section>

      {/* PLATFORM OVERVIEW */}
      <motion.section
        className="home-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Platform Overview</h2>
        <p>
          NearClinic helps patients connect with nearby clinics,
          view essential information, and manage appointments
          in a simple digital environment.
        </p>
      </motion.section>

      {/* CAPABILITIES */}
      <motion.section
        className="home-section light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>What You Can Do on NearClinic</h2>

        <div className="home-cards">
          <div className="home-card">📍 Discover nearby clinics</div>
          <div className="home-card">📅 Manage your appointments</div>
          <div className="home-card">🏥 View clinic information</div>
          <div className="home-card">👤 Access your visit history</div>
        </div>
      </motion.section>

      {/* USERS */}
      <motion.section
        className="home-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Who Uses NearClinic?</h2>
        <p>
          NearClinic is designed for patients, families, and clinics
          looking for a reliable and organized healthcare experience.
        </p>
      </motion.section>

      {/* VALUE */}
      <motion.section
        className="home-section light"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Why Choose NearClinic</h2>
        <div className="home-cards">
          <div className="home-card">✔ Easy to use</div>
          <div className="home-card">✔ Time efficient</div>
          <div className="home-card">✔ Designed for clarity</div>
          <div className="home-card">✔ Built for scalability</div>
        </div>
      </motion.section>

      {/* FUTURE */}
      <motion.section
        className="home-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Looking Ahead</h2>
        <p>
          NearClinic continues to evolve toward a more connected,
          efficient, and patient-friendly healthcare ecosystem.
        </p>
      </motion.section>

    </div>
    </div>
    </>
  );
}


export default Home;
