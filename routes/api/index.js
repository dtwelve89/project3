const router = require("express").Router();
const messRoutes = require("./messes");
const userRoutes = require("./messes");

// Mess routes
router.use("/messes", messRoutes);

//User routes
router.use("/users", userRoutes);

module.exports = router;
