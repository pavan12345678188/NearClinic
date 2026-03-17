# NearClinic — Setup & Run Guide

## Project Structure

```
clinic_project/
├── backend2ndpart/        # Flask (Python) backend  — port 5001
│   ├── app.py             # All Flask routes
│   ├── models.py          # SQLAlchemy models
│   ├── requirements.txt   # Python dependencies
│   └── clinic.db          # SQLite database (auto-created)
│
├── backend3rdpart/        # Node.js backend          — port 5000
│   ├── routes/
│   │   ├── auth.js        # Patient auth (register/login/OTP)
│   │   └── clinics.js     # Clinic listing
│   └── utils/generateOtp.js
│
├── backend2ndpart/server.js  # Node.js entry point
│
├── instance_models/models/   # Mongoose models (shared by Node)
│   ├── Patient.js
│   ├── Otp.js
│   └── clinic.js
│
└── frontend/              # React + Vite frontend      — port 5173
    └── src/
```

---

## 1. Backend — Flask (Python) — Port 5001

```bash
cd backend2ndpart

# Install dependencies
pip install flask flask-cors flask-sqlalchemy flask-jwt-extended werkzeug

# Run Flask
python app.py
```

Flask runs on **http://localhost:5001**

### Seed initial data (run once after first startup):
- Visit http://localhost:5001/seed-clinics  → adds sample clinics
- Visit http://localhost:5001/seed-admin   → creates admin (username: `admin`, password: `admin123`)

---

## 2. Backend — Node.js — Port 5000

Requires **MongoDB** running locally (`mongodb://127.0.0.1:27017/nearclinic`)

```bash
cd backend2ndpart

# Install dependencies
npm install express mongoose cors dotenv bcrypt

# Also install bcrypt in backend3rdpart if needed
cd ../backend3rdpart
npm install bcrypt

# Run Node server (from backend2ndpart)
cd ../backend2ndpart
node server.js
```

Node runs on **http://localhost:5000**

---

## 3. Frontend — React + Vite — Port 5173

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on **http://localhost:5173**

---

## API Summary

| Method | URL | Backend | Description |
|--------|-----|---------|-------------|
| POST | /api/auth/register | Node | Patient register |
| POST | /api/auth/login | Node | Patient login |
| POST | /api/auth/send-otp | Node | Send OTP |
| POST | /api/auth/verify-otp | Node | Verify OTP |
| GET  | /api/clinics | Node | Get clinics by city & area |
| POST | /admin/register | Flask | Register clinic + admin |
| POST | /admin/login | Flask | Admin login |
| POST | /appointments | Flask | Book appointment |
| GET  | /appointments?clinic_id=X | Flask | Get clinic appointments |
| PUT  | /appointments/:id/status | Flask | Update appointment status |

---

## User Flows

### Patient Flow
1. Land on `/` (Landing page)
2. Click **Book Appointment** → redirected to `/login` if not logged in
3. Login or Register at `/login` or `/register`
4. After login → `/AreaSelection` → Select city & area
5. `/selectClinic` → Pick a clinic
6. `/select-slot` → Pick a time slot
7. `/book` → Fill patient details & confirm
8. `/success` → Booking confirmed with token

### Admin Flow
1. Go to `/admin/register` → Register your clinic
2. Login at `/admin/login`
3. View & manage appointments at `/dashboard`
4. Accept or Reject pending appointments

---

## Common Issues

| Issue | Fix |
|-------|-----|
| Flask runs on 5001, not 5000 | Node.js uses 5000; Flask uses 5001 |
| "No clinics found" | Run `/seed-clinics` endpoint once |
| Admin login fails | Run `/seed-admin` or register via `/admin/register` |
| OTP shown in console | Check terminal where Node is running for the OTP |
| MongoDB not connecting | Make sure MongoDB is running: `mongod` |
