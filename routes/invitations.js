const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/invitations");

router.get("/invitation/:id", inviteController.getGuests);
router.get("/users/:id/invitations", inviteController.getPotluckInvites);
router.post("/invitations", inviteController.post);
router.put("/invitations/:id", inviteController.put);
router.delete("/invitations/:id", inviteController.del);



module.exports = router;