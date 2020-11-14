const db = require("../models/invitation");

//GET ALL THE PEOPLE WHO ARE INVITED TO A PARTICULAR POTLUCK
async function getGuests(req, res, next) {
	try {
		const { id } = req.params;
		const invitedGuests = await db.getInvitedGuestsByPotluckId(id);
		res.status(200).json(invitedGuests);
	} catch (err) {
		next(err);
	}
}

//GET ALL THE POTLUCKS A USER HAS BEEN INVITED TO
async function getPotluckInvites(req, res, next) {
	try {
		const { id } = req.params;
		const potluckInvites = await db.getInvitedGuestsByPotluckId(id);
		res.status(200).json(potluckInvites);
	} catch (err) {
		next(err);
	}
}

// ADD USERS TO THE INVITED TABLE
async function post(req, res, next) {
	try {
		const { id } = req.params;
		const inviteGuests = await db.addInvite(req.body, id);
		res.status(200).json(inviteGuests);
	} catch (err) {
		next(err);
	}
}

//UPDATE INVITED GUESTS
async function put(req, res, next) {
	try {
		const { id } = req.params;
		const updateInvitedGuests = await db.updateInvite(req.body, id);
		res.status(200).json(updateInvitedGuests);
	} catch (err) {
		next(err);
	}
}
async function del(req, res, next) {
	try {
		const { id } = req.params;
		await db.removeInvite(id);
		res.status(200).json({
			message: "You have been removed from the guestlist of this potluck",
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getGuests,
	getPotluckInvites,
	post,
	put,
	del,
};
