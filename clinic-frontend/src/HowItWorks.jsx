// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./HowItWorks.css";
import  Navbar from "./Navbar.jsx";

function HowItWorks() {
  const steps = [
    { title: "Choose Area", desc: "Select your location to find nearby clinics." },
    { title: "Select Clinic", desc: "Choose a clinic based on availability." },
    { title: "Book Appointment", desc: "Pick a time slot and confirm instantly." }
  ];

  return (
    <>
    <Navbar showBack={true} />
    <div className="page-container">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How It Works
      </motion.h1>

      <div className="steps-container">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="step-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}

export default HowItWorks;
