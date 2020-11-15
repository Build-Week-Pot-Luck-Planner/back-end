const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invitations");
const { restricted } = require("../middleware/auth");
router.get(
	"/potlucks/:id/invitation",
	restricted,
	inviteController.getInvitedGuests
);
router.get(
	"/users/:id/invitations",
	restricted,
	inviteController.getPotluckInvites
);
router.post("/potlucks/:id/invitation", restricted, inviteController.post);
router.put(
	"/:potluckId/invitation/:inviteId",
	restricted,
	inviteController.put
);
router.delete("/potlucks/:id/invitation", restricted, inviteController.del);

module.exports = router;
