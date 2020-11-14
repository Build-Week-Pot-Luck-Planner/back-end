const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invitations");

router.get("/potluck/:id/invitation", inviteController.getGuests);
router.get("/users/:id/invitations", inviteController.getPotluckInvites);
router.post("/potluck/:id/invitation", inviteController.post);
router.put("/potluck/:id/invitation", inviteController.put);
router.delete("/potluck/:id/invitation", inviteController.del);



module.exports = router;