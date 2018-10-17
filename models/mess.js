const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  levelOfConcern: { type: String, required: false },
  description: { type: String, required: false }
  // timestamp: { type: String, required: false },
  // image: String,
  // sensitive: { type: Boolean, required: false },
  // resolved: { type: Boolean, required: false }
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
