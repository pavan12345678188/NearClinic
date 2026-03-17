import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const res = await fetch("http://localhost:4000/doctor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("doctorId", data.doctorId);
      navigate("/doctor-dashboard");
    } else {
      alert(data.message);
    }

  };

  return (
    <div>

      <h2>Doctor Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default DoctorLogin;