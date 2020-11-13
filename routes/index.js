const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome to the API");
});

const authRoutes = require("./auth");
const userRoutes = require("./users");

router.use('/auth', authRoutes);
router.use("/users", userRoutes);

module.exports = router;