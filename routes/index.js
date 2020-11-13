const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome to the API");
})

const authRoutes = require("./auth");

router.use('/auth', authRoutes);

module.exports = router;