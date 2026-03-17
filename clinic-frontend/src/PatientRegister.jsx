import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./PatientAuth.css";
import { registerPatient } from "./api/authApi";

function PatientRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email.trim().toLowerCase(),
        phone: form.phone,
        password: form.password,
      };

      await registerPatient(payload);

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar showBack={false} showlogin={false} />

      <div className="auth-container auth-page">
        <div className="auth-card">
          <h2>Patient Registration</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button type="submit" className="primary-btn">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PatientRegister;
