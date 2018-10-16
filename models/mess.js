const Schema = mongoose.Schema;

const messSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  descrition: { type: String, required: true },
  timestamp: { type: String, required: true },
  // image: String,
  levelOfConcern: { type: String, required: true },
  sensitive: { type: Boolean, required: true },
  resolved: { type: Boolean, required: true }
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
