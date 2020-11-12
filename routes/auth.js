const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../models/users")
const { restrict } = require("./authenticate-middleware")
const authController = require("../controllers/auth")

router.post("/login", authController.auth);

module.exports = router;