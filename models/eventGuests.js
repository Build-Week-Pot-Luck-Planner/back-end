const db = require("../data/db");
///COMPLETE
function getAttendingGuestsByPotluckId(potluckID) {
	//Returns a list of all guests going to the potluck
	return db("eventGuests as g")
		.innerJoin("users as u", "u.id", "g.id")
		.innerJoin("potlucks as p", "p.id", "g.potluckId")
		.where("p.id", potluckID)
		.select("p.title", "u.username", "g.potluckId");
}


///AS NEEDED
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

function addGuest(data) {
	return db("eventGuests as g").insert(data);
}

function updateGuest(changes, id) {
	return db("eventGuests as g").where("id", id).update(changes);
}

function removeGuest(id) {
	return db("eventGuests as g").where("id", id).del();
}

module.exports = {
	getAttendingGuestsByPotluckId,
	getMaybesByPotluckId,
	getNotAttendingByPotluckId,
	addGuest, 
	updateGuest,
	removeGuest
};
