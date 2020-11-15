const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items");
const { restricted } = require("../middleware/auth");

router.get("/potluck/:id/items", restricted, itemController.getItems);
router.get("/users/:id/items", restricted, itemController.getItemsUserNeedsToBring);
router.post("/potluck/:id/items", restricted, itemController.post);
router.put("/potluck/:id/items/:itemId", restricted, itemController.put);
router.delete("potluck/:id/items/:itemId", restricted, itemController.del);



module.exports = router;