const express = require("express");
const router = express.Router();
const eventGuestsController = require("../controllers/eventGuests");
const { restricted } = require("../middleware/auth");

router.get("/:id/eventguests", restricted, eventGuestsController.getEventGuests);
router.delete(
	"/eventGuests/:guestId",
	restricted,
	eventGuestsController.delEventGuests
);

module.exports = router;