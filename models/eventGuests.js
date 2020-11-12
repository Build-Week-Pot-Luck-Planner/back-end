const db = require("../data/db");

function getAttendingGuestsByPotluckId(potluckID) {
	//Returns a list of all guests going to the potluck
	return db("eventGuests as g")
		.innerJoin("users as u", "u.id", "g.id")
		.innerJoin("potlucks as p", "p.id", "g.potluckId")
		.innerJoin("invitation as i", "i.status", 1)
		.where("g.id", potluckID)
		.select("p.title", "u.username");
}

function getMaybesByPotluckId(potluckID) {
	//Returns a list of all guests going to the potluck
	return db("eventGuests as g")
		.innerJoin("users as u", "u.id", "g.id")
		.innerJoin("potlucks as p", "p.id", "g.potluckId")
		.innerJoin("invitation as i", "i.status", 0)
		.where("g.id", potluckID)
		.select("p.title", "u.username");
}

function getNotAttendingByPotluckId(potluckID) {
	//Returns a list of all guests going to the potluck
	return db("eventGuests as g")
		.innerJoin("users as u", "u.id", "g.id")
		.innerJoin("potlucks as p", "p.id", "g.potluckId")
		.innerJoin("invitation as i", "i.status", -1)
		.where("g.id", potluckID)
		.select("p.title", "u.username");
}

module.exports = {
	getAttendingGuestsByPotluckId,
	getMaybesByPotluckId,
	getNotAttendingByPotluckId,
};
