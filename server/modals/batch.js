const mongoose = require("mongoose");

const batch_schema = new mongoose.Schema({
  students: { type: Array, select: false },
  batch: String,
  course: String,
  batch_period: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  batch_admin: String,
  current_course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
});

module.exports = mongoose.model("batch", batch_schema);
