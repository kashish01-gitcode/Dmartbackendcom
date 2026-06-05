require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);
app.use(express.json());
console.log("process.env.MONGO_URI", process.env.MONGO_URI);
console.log("process.env.MONGODB_NAME", process.env.MONGODB_NAME);

mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGODB_NAME}`, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Connection error:", err));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));

app.get("/", (req, res) => {
  res.send("Dmart Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});