const express = require("express");
const router = express.Router();
const eventGuestsController = require("../controllers/eventGuests");
const { restricted } = require("../middleware/auth");

router.get(
	"/potluck/:id/eventGuests",
	restricted, eventGuestsController.getEventGuests
);
router.delete(
	"/potluck/:id/eventGuests/:guestId",
	restricted,
	eventGuestsController.delEventGuests
);

module.exports = router;