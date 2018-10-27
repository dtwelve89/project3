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
  },
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};
