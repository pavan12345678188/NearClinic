import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AreaSelection.css";
import Navbar from "./Navbar.jsx";

function AreaSelection() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const areasByCity = {
    Hyderabad: ["Kukatpally", "Madhapur", "Gachibowli", "Ameerpet"],
    Bangalore: ["Whitefield", "BTM", "Indiranagar", "Yelahanka"],
    Chennai: ["T Nagar", "Velachery", "Anna Nagar"],
    srikakulam: ["GudiVeedhi", "Dammalaveedhi", "krishna park", "Ambedkar junction", "peddapadu road", "Palasa"],
    visakhapatnam: ["mogalarajapuram", "governopet", "seetharamapuram", "eluru road", "suryaraopet"],
  };

  const handleContinue = () => {
    if (!city || !area) {
      alert("Please select city and area");
      return;
    }

    localStorage.setItem("city", city);
    localStorage.setItem("area", area);

    navigate("/selectClinic", { state: { city, area } });
  };

  return (
    <div className="app-container">
      <Navbar showBack={true} />
      <div className="card area-card">
        <h2 className="title">Select Your Area</h2>
        <p className="subtitle">We'll show clinics near your location</p>

        <div className="form">
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setArea("");
            }}
          >
            <option value="">Select City</option>
            {Object.keys(areasByCity).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            disabled={!city}
          >
            <option value="">Select Area</option>
            {city &&
              areasByCity[city].map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
          </select>

          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default AreaSelection;
