import axios from "axios";

export default {
  // Gets all messes
  getMesses: function() {
    return axios.get("/api/messes");
  },
  // Gets the mess with the given id
  getMess: function(id) {
    return axios.get("/api/messes/" + id);
  },
  // Deletes the mess with the given id
  deleteMess: function(id) {
    return axios.delete("/api/messes/" + id);
  },
  // Saves a mess to the database
  saveMess: function(messData) {
    return axios.post("/api/messes", messData);
  }
};
