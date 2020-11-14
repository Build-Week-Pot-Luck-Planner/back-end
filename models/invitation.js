const db = require("../data/db");

function getInvitedGuestsByPotluckId(potluckID) {
	//Returns a list of all guests invited to the potluck
	return db("eventGuests as g")
		.innerJoin("users as u", "u.id", "g.id")
		.innerJoin("potlucks as p", "p.id", "g.potluckId")
		.where("g.id", potluckID)
		.select("p.title", "u.username");
}

function getPotlucksUserIsInvitedTo(userID) {
	//Returns a list of all guests invited to the potluck
	return db("users as u")
		.innerJoin("invitation as i", "i.guestId", "u.id")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("u.id", userID)
		.select("p.title", "p.date", "p.location");
}

function addInvite(data, id) {
	return db("invitation as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.insert(data);
}

function updateInvite(changes, id) {
	return db("invitation as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.update(changes);
}

function removeInvite(id) {
	return db("invitation as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", id)
		.del();
}

module.exports = {
	getInvitedGuestsByPotluckId,
	getPotlucksUserIsInvitedTo,
	addInvite,
	updateInvite,
	removeInvite,
};
