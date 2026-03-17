const mongoose = require("mongoose");
const Admin = require("./models/Admin");

// connect to Mongo
mongoose.connect("mongodb://127.0.0.1:27017/clinic_db")
  .then(async () => {
    console.log("Mongo connected");

    await Admin.deleteMany({});

    await Admin.create({
      username: "singh",
      password: "1234",
      clinicUniqueId: "abc123"
    });

    console.log("Admin created successfully");
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });