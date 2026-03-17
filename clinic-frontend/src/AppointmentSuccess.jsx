import { useLocation, useNavigate } from "react-router-dom";


function AppointmentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

const data = location.state;

if (!data) return <p>No booking data</p>;

const { clinic, slot, token, success } = data;

return (
  <>
    {success && (
      <div className="confirm-wrapper">
        <div className= "confirm-card">
        <h2>🎉 Appointment Confirmed</h2>

        <p><b>Clinic:</b> {clinic.name}</p>
        <p><b>Time:</b> {slot}</p>
        <p><b>Token:</b> {token}</p>

        <div className="confirm-actions">
          <button className="book-again-btn" onClick={() => navigate("/AreaSelection")}>
            Book Another
          </button>

          <button className="track-btn" onClick={() => alert("Tracking coming soon")}>
            Track Appointment
          </button>
        </div>
        </div>
        </div>
      )}
  </>
  );
}

export default AppointmentSuccess;
