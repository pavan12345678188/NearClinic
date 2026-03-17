import React, { useState } from "react";
import "./DoctorDashboard.css";
import { useNavigate } from "react-router-dom";


function DoctorDashboard() {

  const admin = JSON.parse(localStorage.getItem("admin"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/");
  }
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "active" : ""}`}>
        <h2 className="logo">NearClinic</h2>

        <ul>
          <li>Dashboard</li>
          <li>Appointments</li>
          <li>Patients</li>
          <li>Profile</li>
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main">

        {/* Top Navbar */}
        <header className="navbar">

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <h2>Doctor Dashboard</h2>

          <div className="doctor">
            Dr. {admin?.username}
          </div>

        </header>

        {/* Dashboard Content */}
        <div className="dashboard-body">

          <div className="cards">
            <div className="card">
              <h3>Today's Appointments</h3>
              <p>12</p>
            </div>

            <div className="card">
              <h3>Total Patients</h3>
              <p>56</p>
            </div>

            <div className="card">
              <h3>Pending</h3>
              <p>4</p>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <p>18</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;