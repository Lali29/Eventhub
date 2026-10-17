
const express = require("express");
const mongoose = require("mongoose");
const Participant = require("../models/Participant");
const Event = require("../models/Event");

const router = express.Router();

// Add a participant
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, event, status } = req.body;

    if (!name || !email || !event) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and event are required.",
      });
    }

    if (!mongoose.isValidObjectId(event)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const existingEvent = await Event.findById(event);

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const participant = await Participant.create({
      name,
      email,
      phone,
      event,
      status,
    });

    await participant.populate("event", "eventName");

    res.status(201).json({
      success: true,
      message: "Participant added successfully.",
      participant,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered for this event.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// View all participants, including their event names
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find()
      .populate("event", "eventName eventDate")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: participants.length,
      participants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a participant
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid participant ID.",
      });
    }

    const participant = await Participant.findByIdAndDelete(
      req.params.id
    );

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found.",
      });
    }

    res.json({
      success: true,
      message: "Participant deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;