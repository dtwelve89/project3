const router = require("express").Router();
const messRoutes = require("./messes");

// Article routes
router.use("/messes", messRoutes);

module.exports = router;
