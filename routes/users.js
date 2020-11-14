const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const {restricted} = require("../middleware/auth");

router.get("/", restricted, usersController.getUsers);
router.get("/:userId", restricted, usersController.getUser);
router.put("/:userId", restricted, usersController.updateUser);
router.delete("/:userId", restricted, usersController.deleteUser);

module.exports = router;