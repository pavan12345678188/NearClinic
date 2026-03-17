import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar.jsx";

function SelectSlot() {
  const location = useLocation();
  const navigate = useNavigate();
  const clinic = location.state?.clinic;

  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!clinic) {
    return (
      <>
        <Navbar showBack={true} />
        <p style={{ padding: "40px", textAlign: "center" }}>
          No clinic selected.{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/AreaSelection")}
          >
            Go back
          </span>
        </p>
      </>
    );
  }

  const slots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <>
      <Navbar showBack={true} showlogin={false} />
      <div className="slot-container">
        <div className="slot-card">
          <h2 className="slot-title">
            Select Slot for <span>{clinic.name}</span>
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {clinic.address}
          </p>

          <div className="slot-grid">
            {slots.map((slot) => (
              <div
                key={slot}
                className={`slot-box ${selectedSlot === slot ? "active" : ""}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </div>
            ))}
          </div>

          <button
            className="continue-btn"
            disabled={!selectedSlot}
            onClick={() =>
              navigate("/book", { state: { clinic, slot: selectedSlot } })
            }
          >
            Continue to Booking →
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectSlot;
