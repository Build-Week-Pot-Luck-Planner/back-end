const express = require("express");
const router = express.Router();
const {restricted} = require("../middleware/auth");
const potlucksController = require("../controllers/potlucks");

router.get("/", restricted, potlucksController.getUsersPotlucks);
router.post("/", restricted, potlucksController.createPotluck);
router.get("/:potluckId", restricted, potlucksController.getPotluck);

module.exports = router;