import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./AdminAuth.css";
import Navbar from "./Navbar";


function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:4000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }

    // ✅ Store token securely
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminInfo", JSON.stringify(data.admin));

    navigate("/doctor-dashboard");

  } catch (err) {
    alert("Admin server not reachable");
  }
};


   useEffect(() => {
    document.body.classList.add("auth-body");
    return () => {
      document.body.classList.remove("auth-body");
    };
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
        <h2>Doctor Access</h2>
        <p className="admin-warning">
          Authorized clinic administrators only.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Doctor Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Doctor Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
      <button type="submit">Login as Doctor</button>
      <p className="admin-register-link">
  New Clinic?{" "}
  <span onClick={() => navigate("/admin/register")}>
    Register here
  </span>
</p>

    </form>
  </motion.div>

    </div>
    </>
  );
}

export default AdminLogin;
