const db = require("../data/db");

function getItemsByPotluckId(potluckId) {
	// returns all items required to be brought to a particular potluck
	return db("item as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", potluckId)
		.select("i.name", "i.potluckId");
}

function getItemsByUserId(userID) {
	//Returns the item a user is required to bring.
	return db("item as i")
		.innerJoin("users as u", "u.id", "i.id")
		.where("u.id", userID)
		.select("i.*");
}

function addItem(data, id) {
	return db("item as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.insert(data);
}

function updateItems(changes, id) {
	return db("item as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.update(changes);
}

function removeItem(id) {
	return db("item as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.del();
}

module.exports = {
	getItemsByUserId,
	getItemsByPotluckId,
	addItem,
	updateItems,
	removeItem,
};
