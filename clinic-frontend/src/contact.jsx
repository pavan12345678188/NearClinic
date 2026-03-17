// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Contact.css";
import  Navbar from "./Navbar.jsx";

function Contact() {
  return (
    <>
    <Navbar showBack={true} />
    <div className="contact-page">

      <h1 className="contact-title">Contact NearClinic</h1>
      <p className="contact-subtitle">
        We're here to help doctors and patients. Reach out to us anytime.
      </p>

      <div className="contact-container">

        {/* Contact Info */}
        <div className="contact-info">

          <h2>Get in Touch</h2>

          <div className="info-item">
            <span>📧</span>
            <p>support@nearclinic.com</p>
          </div>

          <div className="info-item">
            <span>📞</span>
            <p>+91 7780239013</p>
          </div>

          <div className="info-item">
            <span>📍</span>
            <p>Andhra Pradesh, India</p>
          </div>

          <div className="info-item">
            <span>⏰</span>
            <p>Mon - Sat : 9:00 AM – 6:00 PM</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="contact-form">

          <h2>Send Message</h2>

          <input type="text" placeholder="Your Name" />

          <input type="email" placeholder="Your Email" />

          <textarea placeholder="Your Message"></textarea>

          <button>Send Message</button>

        </div>

      </div>

    </div>
    </>
  );
}

export default Contact;