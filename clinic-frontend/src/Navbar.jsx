import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ showBack = false, showlogin=false }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        {showBack && (
          <button className="back-btn" onClick={() => navigate(-1)}>
             Back
          </button>
        )}
      </div>

      {/* CENTER */}
      <div className="nav-center">
        <h1 className="nav-logo_text">NearClinic🩺</h1>
      </div>


      {/* RIGHT */}
      <div className="nav-right">
        {showlogin && (
          <button className="login-btn" onClick={() => navigate("/select-login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
