import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";
import AuthLayout from "./AuthLayout";
import Landingpage from "./Landingpage";
import Services from "./services";
import HowItWorks from "./HowItWorks";
import Contact from "./contact";
import Home from "./Home";
import SelectSlot from "./SelectSlot";
import SelectClinic from "./SelectClinic";
import AppointmentForm from "./AppointmentForm";
import AreaSelection from "./AreaSelection";
import VerifyOtp from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import ClinicDashboard from "./ClinicDashboard";
import PatientLogin from "./PatientLogin";
import PatientRegister from "./PatientRegister";
import LoginSelect from "./LoginSelect";
import AppointmentSuccess from "./AppointmentSuccess";
import AdminProtected from "./AdminProtected";
import DoctorDashboard from "./DoctorDashboard";


// Protected route for admin dashboard
function AdminRoute({ children }) {
  return localStorage.getItem("adminLoggedIn") === "true"
    ? children
    : <Navigate to="/admin/login" replace />;
}


// Protected route for patient pages
function PatientRoute({ children }) {
  return localStorage.getItem("token")
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/select-login" element={<LoginSelect />} />
        <Route path="/login" element={<PatientLogin />} />
        <Route path="/register" element={<PatientRegister />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminProtected><ClinicDashboard /></AdminProtected>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

        {/* PATIENT PROTECTED FLOW */}
        <Route
          path="/AreaSelection"
          element={
            <PatientRoute>
              <AreaSelection />
            </PatientRoute>
          }
        />
        <Route
          path="/selectClinic"
          element={
            <PatientRoute>
              <AuthLayout showBack={true}>
                <SelectClinic />
              </AuthLayout>
            </PatientRoute>
          }
        />
        <Route
          path="/select-slot"
          element={
            <PatientRoute>
              <SelectSlot />
            </PatientRoute>
          }
        />
        <Route
          path="/book"
          element={
            <PatientRoute>
              <AppointmentForm />
            </PatientRoute>
          }
        />
        <Route path="/success" element={<AppointmentSuccess />} />

        {/* ADMIN PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <ClinicDashboard />
            </AdminRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
