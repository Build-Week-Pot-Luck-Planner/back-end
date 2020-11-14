const express = require('express');
const router = express.Router();
const invitesRouter = require("../routes/invitations")
router.get("/", (req, res)=>{
    res.send("Welcome to the API");
})

const authRoutes = require("./auth");

router.use('/auth', authRoutes);
router.use('/potlucks', invitesRouter )
module.exports = router;