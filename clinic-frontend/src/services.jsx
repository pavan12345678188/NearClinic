// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Services.css";
import  Navbar from "./Navbar.jsx";

function Services() {
  const services = [
    "General Consultation",
    "Dental Care",
    "Eye Care",
    "Child Care",
    "Health Checkups",
    "Specialist Clinics"
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
        Our Services
      </motion.h1>

      <motion.div
        className="services-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="service-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {service}
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>
  );
}

export default Services;
