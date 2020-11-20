const db = require("../data/db");

function getInvitedGuestsByPotluckId(potluckID) {
	//Returns a list of all guests invited to the potluck
	return db("invitation as i")
		.innerJoin("users as u", "u.id", "i.guestId")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("p.id", `${potluckID}`)
		.select("p.title", "u.username", "i.id");
}

function getPotlucksUserIsInvitedTo(userID) {
	//Returns a list of all guests invited to the potluck
	return db("users as u")
		.innerJoin("invitation as i", "i.guestId", "u.id")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.where("u.id", `${userID}`)
		.select("i.*", "p.*", "u.*");
}

async function addInvite(data, id) {
	//Invites a user to a potluck
	return db("invitation as i").insert({
		guestId: data.guestId,
		potluckId: id,
		status: 0,
	});
}

async function updateInvite(changes, id) {
	const invitationInfo = await db("invitation as i").where("i.id", id).first();
	await db("invitation as i").where("i.id", `${id}`).del();
	if (changes.status === 1) {
		return db("eventGuests as e")
			.innerJoin("potlucks as p", "p.id", "i.potluckId")
			.where("p.id", `${id}`)
			.insert({
				guestId: invitationInfo.guestId,
				potluckId: invitationInfo.potluckId,
			});
	}
}

function removeInvite(id) {
	return db("invitation as i")
		.where("i.id", `${id}`)
		.del();
}

module.exports = {
	getInvitedGuestsByPotluckId,
	getPotlucksUserIsInvitedTo,
	addInvite,
	updateInvite,
	removeInvite,
};
