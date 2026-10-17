const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const participantRoutes = require("./routes/participantRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());

// Event routes
app.use("/api/events", eventRoutes);
app.use("/api/participants", participantRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "EventHub Backend API is running",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });