const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
