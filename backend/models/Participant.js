
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Registered", "Attended", "Cancelled"],
      default: "Registered",
    },
  },
  { timestamps: true }
);

participantSchema.index({ email: 1, event: 1 }, { unique: true });

module.exports = mongoose.model("Participant", participantSchema);