const router = require("express").Router();
const messesController = require("../../controllers/messesController");
const syringeController = require("../../controllers/syringeController");

// Matches with "/api/messes"
router.get("/", messesController.findAll);
router.post("/", messesController.create);

// Matches with "/api/messes/reportedUser"
router.route("/:reportedUser")
  .get(messesController.findByUser)

// Matches with "/api/messes/:id"
router
  .route("/:id")
  .get(messesController.findById)
  .put(messesController.update)
  .delete(messesController.remove);

router
  .route("/311")
  .post(syringeController.reportSyringe);

module.exports = router;
