const express = require('express');
const router = express.Router();
const invitesRouter = require("../routes/invitations")
const eventGuests = require("./eventGuests")
const items = require("./items");
const invites = require("./invitations")
router.get("/", (req, res)=>{
    res.send("Welcome to the API");
});

const authRoutes = require("./auth");
const userRoutes = require("./users");

router.use('/auth', authRoutes);

router.use('/potlucks', invitesRouter )
router.use("/potlucks/:id", eventGuests);
router.use("/", items);
router.use("/", invites);
router.use("/users", userRoutes);


module.exports = router;