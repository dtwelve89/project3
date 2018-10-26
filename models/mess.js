const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  levelOfConcern: { type: String, required: true },
  description: { type: String, required: false },
  sensitive: { type: String, required: true },
  image: { type: Buffer, contentType: String },
  resolved: { type: Boolean, required: false },
  timestamp: { type: Date, default: Date.now },
  lat: {type:Number},
  lng: {type:Number}
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
