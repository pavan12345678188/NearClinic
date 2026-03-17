import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { getAppointments, updateAppointmentStatus } from "./api/authApi";

function ClinicDashboard() {
  const clinicId = localStorage.getItem("clinicId");
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clinicId) {
      navigate("/admin/login");
      return;
    }

    getAppointments(clinicId)
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [clinicId, navigate]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("clinicId");
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar showBack={false} showlogin={false} />
      <div className="app-container" style={{ alignItems: "flex-start", paddingTop: "30px" }}>
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "90%", maxWidth: "950px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 className="title">Clinic Dashboard</h2>
              <p className="subtitle">Manage your clinic appointments</p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>

          {loading && <p>Loading appointments...</p>}

          {!loading && appointments.length === 0 && (
            <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
              No appointments yet for this clinic.
            </p>
          )}

          {!loading && appointments.length > 0 && (
            <table className="dashboard-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr style={{ background: "#2c5364", color: "white" }}>
                  <th style={th}>Patient</th>
                  <th style={th}>Mobile</th>
                  <th style={th}>Problem</th>
                  <th style={th}>Date</th>
                  <th style={th}>Time</th>
                  <th style={th}>Status</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={td}>{a.patient_name}</td>
                    <td style={td}>{a.mobile}</td>
                    <td style={td}>{a.problem || "—"}</td>
                    <td style={td}>{a.date}</td>
                    <td style={td}>{a.time}</td>
                    <td style={td}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          background:
                            a.status === "Confirmed"
                              ? "#d4edda"
                              : a.status === "Cancelled"
                              ? "#f8d7da"
                              : "#fff3cd",
                          color:
                            a.status === "Confirmed"
                              ? "#155724"
                              : a.status === "Cancelled"
                              ? "#721c24"
                              : "#856404",
                        }}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td style={td}>
                      {a.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(a.id, "Confirmed")}
                            style={{ ...actionBtn, background: "#27ae60", marginRight: "6px" }}
                          >
                            ✓ Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(a.id, "Cancelled")}
                            style={{ ...actionBtn, background: "#e74c3c" }}
                          >
                            ✗ Reject
                          </button>
                        </>
                      ) : (
                        <span style={{ color: "#999" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </>
  );
}

const th = { padding: "10px 12px", textAlign: "left", fontWeight: "600" };
const td = { padding: "10px 12px" };
const actionBtn = {
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "12px",
};

export default ClinicDashboard;
