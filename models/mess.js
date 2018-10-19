const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  levelOfConcern: { type: String, required: true },
  description: { type: String, required: false },
  sensitive: { type: String, required: true },
  // image: String,
  // resolved: { type: Boolean, required: false },
  timestamp: { type: Date, default: Date.now }
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
