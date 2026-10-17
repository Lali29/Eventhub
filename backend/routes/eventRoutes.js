const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// ==========================================
// CREATE EVENT
// POST /api/events
// ==========================================
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);

    const savedEvent = await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
});

// ==========================================
// GET ALL EVENTS
// GET /api/events
// ==========================================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE EVENT
// GET /api/events/:id
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid event ID",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE EVENT
// PUT /api/events/:id
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE EVENT
// DELETE /api/events/:id
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
});

module.exports = router;