const db = require("../data/db");

function getItemsByPotluckId(potluckId) {
	// returns all items required to be brought to a particular potluck
	return db("item as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", potluckId)
		.select("i.name", "i.potluckId", "i.id");
}

//allow user to select item

function assignItemByUserId(itemID, userID) {
	//allows a user to select an item.
	console.log(`userId = ${userID}, itemId = ${itemID}`);
	return db("item as i")
		.innerJoin("users as u", "u.id", "i.guestResponsible")
		.where("i.id", `${itemID}`)
		.update("guestResponsible", `${userID}`)
		
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
		.insert({
			name: data.name,
			potluckId: id,
		});
}

function updateItems(changes, id) {
	return db("item as i").where("i.id", id).update({
		name: changes.name,
	});
}

function removeItem(id) {
	return db("item as i").where("i.id", id).del();
}

module.exports = {
	getItemsByUserId,
	getItemsByPotluckId,
	assignItemByUserId,
	addItem,
	updateItems,
	removeItem,
};
