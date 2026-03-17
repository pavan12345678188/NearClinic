import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./AdminAuth.css";
import Navbar from "./Navbar";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    clinicName: "",
    address: "",
    city: "",
    area: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password match validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicName: form.clinicName,
          address: form.address,
          city: form.city,
          area: form.area,
          phone: form.phone,
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Clinic registered successfully. Please login.");
      navigate("/admin/login");

    } catch (error) {
      console.error(error);
      alert("Server not reachable");
    }
  };

  useEffect(() => {
    document.body.classList.add("auth-body");
    return () => document.body.classList.remove("auth-body");
  }, []);

  return (
    <>
      <Navbar showBack={false} showlogin={false} />

      <div className="admin-auth-container">
        <motion.div
          className="admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Register Your Clinic</h2>
          <p className="admin-warning">
            Create an account to manage appointments on NearClinic.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="clinicName"
              placeholder="Clinic Name"
              value={form.clinicName}
              onChange={handleChange}
              required
            />

            <input
              name="address"
              placeholder="Clinic Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />

            <input
              name="area"
              placeholder="Area"
              value={form.area}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Clinic Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <hr className="form-divider" />

            <input
              name="username"
              placeholder="Doctor Name"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Doctor Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Register Clinic</button>
          </form>

          <p className="admin-register-link">
            Already registered?{" "}
            <span onClick={() => navigate("/admin/login")}>
              Login here
            </span>
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default AdminRegister;