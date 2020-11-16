const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invitations");
const { restricted } = require("../middleware/auth");
router.get(
	"/potlucks/:id/invitations",
	restricted,
	inviteController.getInvitedGuests
);
router.get(
	"/users/:id/invitations",
	restricted,
	inviteController.getPotluckInvites
);
router.post("/potlucks/:id/invitations", restricted, inviteController.post);
router.put(
	"/potlucks/:potluckId/invitations/:inviteId",
	restricted,
	inviteController.put
);
router.delete(
	"/potlucks/:id/invitations/:inviteId",
	restricted,
	inviteController.del
);

module.exports = router;
