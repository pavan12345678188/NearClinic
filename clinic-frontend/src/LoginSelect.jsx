import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./LoginSelect.css";
import Navbar from "./Navbar.jsx";


function LoginSelect() {
  const navigate = useNavigate();

 useEffect(() => {
    document.body.classList.add("auth-body");
    return () => {
      document.body.classList.remove("auth-body");
    };
  }, []);



  return (
    
    <div className="login-select-container">
      <motion.div
        className="login-select-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <Navbar showBack={true} />
        <h2>Login to NearClinic</h2>
        <p>Select how you want to login</p>

        <button
          className="patient-btn"
          onClick={() => navigate("/login")}
        >
          Patient Login
        </button>

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/login")}
        >
          Doctor Login
        </button>
      </motion.div>
    </div>
  );
}

export default LoginSelect;
