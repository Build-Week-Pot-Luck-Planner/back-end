const db = require("../models/item");

//GET ALL THE ITEMS REQUESTED TO BE BROUGHT TO A PARTICULAR POTLUCK
async function getItems(req, res, next) {
	try {
		const { id } = req.params;
		const items = await db.getItemsByPotluckId(id);
		if (!items) {
			return res.status(404).json({
				message: "this potluck does not have any items",
			});
		}
		res.status(200).json(items);
	} catch (err) {
		next(err);
	}
}

//GET ALL THE ITEM A USER HAS SAID THEY WILL BRING TO A SPECIFIED POTLUCK
async function getItemsUserNeedsToBring(req, res, next) {
	try {
		const { id } = req.params;
		const usersItems = await db.getItemsByUserId(id);
		if (!usersItems) {
			return res.status(404).json({
				message: "you have not yet selected what you will bring anything to this potluck",
			});
		}
		res.status(200).json(usersItems);
	} catch (err) {
		next(err);
	}
}

// ADD ITEMS TO THE SPECIFIED POTLUCK
async function post(req, res, next) {
	try {
        const { id } = req.params;
		await db.addItem(req.body, id);
		res.status(200).json(`${req.body.name} added`);
	} catch (err) {
		next(err);
	}
}

//UPDATE ITEMS
async function put(req, res, next) {
	try {
        const { itemId } = req.params;
		const updateItems = await db.updateItems(req.body, itemId);
		if (!updateItems) {
			return res.status(404).json({
				message:
					"you need to add this item before you can edit it.",
			});
		} if (updateItems === 1){
		res.status(200).json({message: "Item Updated"})
	};
	} catch (err) {
		next(err);
	}
}
//DELETE AN ITEM
async function del(req, res, next) {
	try {
        const { itemId } = req.params;
		const deleteItem = await db.removeItem(itemId);
		if (!deleteItem) {
			return res.status(404).json({
				message: "item cannot be deleted as it does not exist.",
			});
		}
		res.status(200).json({
			message: "You have removed this item from the potluck",
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getItems,
	getItemsUserNeedsToBring,
	post,
	put,
	del,
};
