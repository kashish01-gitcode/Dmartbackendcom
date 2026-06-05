const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

createAdmin();