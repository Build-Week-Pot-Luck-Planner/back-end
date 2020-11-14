const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items");

router.get("/potluck/:id/items", itemController.getItems);
router.get("/users/:id/items", itemController.getItemsUserNeedsToBring);
router.post("/potluck/:id/items", itemController.post);
router.put("/potluck/:id/items", itemController.put);
router.delete("potluck/:id/items", itemController.del);



module.exports = router;