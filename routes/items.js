const express = require("express");
const router = express.Router();
const itemController = require("../controllers/items");
const { restricted } = require("../middleware/auth");

router.get("/potlucks/:id/items", restricted, itemController.getItems);
router.get("/users/:id/items", restricted, itemController.getItemsUserNeedsToBring);
router.post("/potlucks/:id/items", restricted, itemController.post);
router.put("/potlucks/:id/items/:itemId", restricted, itemController.put);
router.delete("potlucks/:id/items/:itemId", restricted, itemController.del);



module.exports = router;