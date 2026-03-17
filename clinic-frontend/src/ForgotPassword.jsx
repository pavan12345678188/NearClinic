import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./PatientAuth.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — connect to backend reset flow
    setSubmitted(true);
  };

  return (
    <>
      <Navbar showBack={true} showlogin={false} />
      <div className="auth-container auth-page">
        <div className="auth-card">
          <h2>Forgot Password</h2>

          {submitted ? (
            <p className="message success">
              If this email is registered, a reset link will be sent shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="primary-btn">
                Send Reset Link
              </button>
            </form>
          )}

          <div className="register-link">
            <span
              className="register-text"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
