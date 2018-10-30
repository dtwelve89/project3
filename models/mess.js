const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  levelOfConcern: { type: String, required: true },
  description: { type: String, required: false },
  sensitive: { type: String, required: true },
  imageMess: { type: Buffer, contentType: String },
  imageCleaned: { type: Buffer, contentType: String },
  resolved: { type: Boolean, default: false, required: false },
  timestampReport: { type: Date, default: Date.now },
  timestampCleaned: { type: Date },
  lat: {type:Number},
  lng: {type:Number},
  reportedUser: { type: String}
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
