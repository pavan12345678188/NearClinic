import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./PatientAuth.css";
import Navbar from "./Navbar.jsx";
import { loginPatient } from "./api/authApi";

function PatientLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-body");
    return () => document.body.classList.remove("auth-body");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginPatient({
        email: form.email,
        password: form.password,
      });

      console.log("LOGIN SUCCESS:", response.data);

      // store user
      localStorage.setItem("patient", JSON.stringify(response.data.user));
      localStorage.setItem("token", "patient-token");

      navigate("/AreaSelection");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar showBack={true} showlogin={false} />

      <div className="auth-container auth-page">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Patient Login</h2>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="forgot-password">
              <span onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="register-link">
              <span>New patient?</span>
              <span
                className="register-text"
                onClick={() => navigate("/patient/register")}
              >
                {" "}Register here
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default PatientLogin;
