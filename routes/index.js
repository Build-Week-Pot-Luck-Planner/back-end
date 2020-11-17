const express = require('express');
const router = express.Router();
const invitesRouter = require("../routes/invitations")
const eventGuests = require("./eventGuests")
const items = require("./items");
const invites = require("./invitations")
router.get("/", (req, res) => {
	res.status(200).json({
		message: "we did it!",
	});
});

const authRoutes = require("./auth");
const userRoutes = require("./users");
const potluckRoutes = require("./potlucks");

router.use('/auth', authRoutes);

router.use("/potlucks", potluckRoutes);
router.use('/potlucks', invitesRouter )
router.use("/potlucks", eventGuests);
router.use("/", items);
router.use("/", invites);
router.use("/users", userRoutes);


module.exports = router;