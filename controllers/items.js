const db = require("../models/item");

//GET ALL THE ITEMS REQUESTED TO BE BROUGHT TO A PARTICULAR POTLUCK
async function getItems(req, res, next) {
	try {
		const { id } = req.params;
		const items = await db.getItemsByPotluckId(id);
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
		res.status(200).json(usersItems);
	} catch (err) {
		next(err);
	}
}

// ADD ITEMS TO THE SPECIFIED POTLUCK
async function post(req, res, next) {
	try {
        const { id } = req.params;
		const addItems = await db.addItem(req.body, id);
		res.status(200).json(addItems);
	} catch (err) {
		next(err);
	}
}

//UPDATE ITEMS
async function put(req, res, next) {
	try {
        const { id } = req.params;
		const updateItems = await db.updateItems(req.body.item, id);
		res.status(200).json(updateItems);
	} catch (err) {
		next(err);
	}
}
//DELETE AN ITEM
async function del(req, res, next) {
	try {
        const { id } = req.params;
		await db.removeItem(id);
		res.status(200).json({
			message: "You have been removed from the guestlist of this potluck",
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
