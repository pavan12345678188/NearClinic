import axios from "axios";
import { NODE_URL } from "./base";

const AUTH_API = `${NODE_URL}/api/auth`;

// ─── Auth via Node ─────────────────────────

export const loginPatient = (data) =>
  axios.post(`${AUTH_API}/login`, data);

export const registerPatient = (data) =>
  axios.post(`${AUTH_API}/register`, data);

export const sendOtp = (mobile) =>
  axios.post(`${AUTH_API}/send-otp`, { mobile });

export const verifyOtp = (mobile, otp) =>
  axios.post(`${AUTH_API}/verify-otp`, { mobile, otp });


// ─── Clinics via Node ──────────────────────

export const getClinics = (city, area) =>
  axios.get(`${NODE_URL}/api/clinics?city=${city}&area=${area}`);


export const bookAppointment = (data) =>
  axios.post(`${NODE_URL}/api/book-appointment`, data);

export const getAppointments = (clinic_id) =>
  axios.get(`${NODE_URL}/api/appointments?mobile=${clinic_id}`);

export const updateAppointmentStatus = (appointment_id, status) =>
  axios.post(`${NODE_URL}/api/update-appointment-status`, { appointment_id, status });