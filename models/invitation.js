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
	return db("invitation as i")
		.innerJoin("potlucks as p", "p.id", "i.potluckId")
		.innerJoin("users as u", "u.id", "p.organizerId")
		.where("i.guestId", `${userID}`)
		.select(
			"i.id as invitationId",
			"p.title",
			"p.id as potluckId",
			"u.username as potluckOrganizer",
			"u.id as guestId"
		);
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
