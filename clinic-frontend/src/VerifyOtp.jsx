import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./PatientAuth.css";
import { sendOtp, verifyOtp } from "./api/authApi";

function VerifyOtp() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState(
    localStorage.getItem("patientPhone") || ""
  );
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

   useEffect(() => {
  if (!otpSent || canResend) return;

  if (timer === 0) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanResend(true);
    return;
  }

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer, otpSent, canResend]);



  const handleSendOtp = async () => {
    if (!phone) {
      setMessage("Enter phone number");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");


    try {
      await sendOtp(phone);
      setOtpSent(true);
      setMessage("OTP sent successfully to " + phone);
      setMessageType("success");
    
      // Start timer for resend
      setTimer(30);
      setCanResend(false);

    }catch (err) {
      setMessage(err.message);
      setMessageType("error");
    }
    setLoading(false);
  };

 const handleVerifyOtp = async () => {
  if (!otp) {
    setMessage("Enter OTP");
    setMessageType("error");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const res = await verifyOtp(phone, otp);

    localStorage.setItem("token", res.data.token);

    setMessage("OTP verified successfully!");
    setMessageType("success");

    setTimeout(() => {
      navigate("/"); // landing page
    }, 1000);

  } catch (err) {
    setMessage(err.message);
    setMessageType("error");
  }

  setLoading(false);
};

  return (
    <>
      <Navbar showBack={false} showlogin={false} />

      <div className="auth-container auth-page">
        <div className="auth-card">
          <h2>Enter a  Mobile Number for OTP Verification</h2>

          {!otpSent && (
            <>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                className="primary-btn"
                onClick={handleSendOtp}
                disabled={loading}
              >
                Send OTP
              </button>
            </>
          )}

          {message && (
            <p className={`message ${messageType}`}>
              {message}
            </p>
          )}

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="primary-btn"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <div className="resend-container">
                {!canResend ? (
                  <p className="resend-timer">
                    Resend OTP in <strong>{timer}s</strong> 
                  </p>
                ) : (
                  <button
                    className="resend-btn"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;
