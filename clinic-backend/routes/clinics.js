const express = require("express");
const router = express.Router();

const clinics = [
  {
    id: 1,
    name: "Singh clinic",
    city: "Srikakulam",
    UNIQUE_ID:"abc123",
    area: "GudiVeedhi",
    address: "7 Road Junction",
    phone: "7894561234",
  },
  {
    id: 2,
    name: "suryanaryana Clinic",
    city: "Srikakulam",
    UNIQUE_ID:"def456",
    area: "GudiVeedhi",
    address: "7 Road Junction",
    phone: "9440001967",
  },
  {
    id: 3,
    name: "Semmana Clinic",
    city: "Srikakulam",
    UNIQUE_ID:"ghi789",
    area: "DhammalaVeedhi",
    address: "Near Market",
    phone: "7777777777",
  },
  {
    id: 4,
    name: "Suribabu Clinic",
    city: "Srikakulam",
    UNIQUE_ID:"jkl012", 
    area: "GudiVeedhi",
    address: "Riksha Stand",
    phone: "9440001969",
  },
  {
    id: 5,
    name: "Rao Clinic",
    city: "Srikakulam",
    UNIQUE_ID:"mno345",
    area: "GudiVeedhi",
    address: "Near School",
    phone: "5555555555", 
  },
  {
    id: 6,
    name: "Sharma Clinic",
    city: "Srikakulam",
    UNIQUE_ID:"pqr678",
    area: "GudiVeedhi",
    address: "Near Hospital",
    phone: "4444444444",
  },
  {
    id: 7,
    name: "Verma Clinic",
    city: "visakhapatnam",
    UNIQUE_ID:"stu901",
    area: "suryaraopet",
    address: "Near Railway Station",
    phone: "3333333333",
  },
  {
    id: 8,
    name: "Gupta Clinic",
    city: "visakhapatnam",
    UNIQUE_ID:"vwx234",
    area: "suryaraopet",
    address: "Near Airport",
    phone: "2222222222",
  }
];

// GET clinics
router.get("/", (req, res) => {
  const { city, area } = req.query;

  if (!city || !area) {
    return res.status(400).json({ message: "City and area are required" });
  }

  const result = clinics.filter(
    c =>
      c.city.toLowerCase() === city.toLowerCase() &&
      c.area.toLowerCase() === area.toLowerCase() 
  );

  res.json(result);
});

module.exports = router;
