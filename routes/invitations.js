const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invitations");
const { restricted } = require("../middleware/auth");
router.get("/potluck/:id/invitation", restricted, inviteController.getGuests);
router.get(
	"/users/:id/invitations",
	restricted,
	inviteController.getPotluckInvites
);
router.post("/potluck/:id/invitation", restricted, inviteController.post);
router.put(
	"/:potluckId/invitation/:inviteId",
	restricted,
	inviteController.put
);
router.delete("/potluck/:id/invitation", restricted, inviteController.del);

module.exports = router;
