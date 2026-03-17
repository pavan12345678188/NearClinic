import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { getClinics } from "./api/authApi";

function SelectClinic() {
  const location = useLocation();
  const navigate = useNavigate();

  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  const { city, area } = location.state || {};

  useEffect(() => {
    if (!city || !area) {
      navigate("/AreaSelection");
      return;
    }

    const fetchClinics = async () => {
      try {
        const res = await getClinics(city, area);
        setClinics(res.data);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [city, area, navigate]);

  return (
    <>
      <Navbar showBack={true} showlogin={false} />
      <div className="select-clinic-page">
        <h2>Clinics near {area}, {city}</h2>

        {loading && <p>Loading clinics...</p>}

        {!loading && clinics.length === 0 && (
          <p>No clinics found in this area.</p>
        )}

        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className={`clinic-card ${
              selectedClinic?.id === clinic.id ? "active" : ""
            }`}
            onClick={() => setSelectedClinic(clinic)}
          >
            <h3>CLINIC_UNIQUE_ID: {clinic.UNIQUE_ID}</h3>
            <h2>{clinic.name}</h2>
            <p>{clinic.area}</p>
            <p>📞 {clinic.phone}</p>
          </div>
        ))}

        <button
          className="continue-btn"
          disabled={!selectedClinic}
          onClick={() =>
            navigate("/select-slot", { state: { clinic: selectedClinic } })
          }
        >
          Continue to Slot Selection
        </button>
      </div>
    </>
  );
}

export default SelectClinic;
