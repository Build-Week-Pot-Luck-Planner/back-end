const db = require("../models/invitation");

//GET ALL THE PEOPLE WHO ARE INVITED TO A PARTICULAR POTLUCK
async function getInvitedGuests(req, res, next) {
	try {
		const { id } = req.params;
		const invitedGuests = await db.getInvitedGuestsByPotluckId(id);
		if (!invitedGuests) {
			return res.status(404).json({
				message: "no guests invited",
			});
		}
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
		if (!potluckInvites) {
			return res.status(404).json({
				message: "you have not been invited to any potlucks yet",
			});
		}
		res.status(200).json(potluckInvites);
	} catch (err) {
		next(err);
	}
}

// ADD USERS TO THE INVITED TABLE
async function post(req, res, next) {
	try {
		const { id } = req.params;
		await db.addInvite(req.body, id);
		res.status(200).json({
			message: `${req.body.username} successfully invited`
		});
	} catch (err) {
		next(err);
	}
}

//UPDATE INVITED GUESTS
async function put(req, res, next) {
	try {
		console.log("err");
		const { inviteId } = req.params;
		await db.updateInvite(req.body, inviteId);
		if (req.body.status === 1) {
			res.status(200).json({
				message: "Congrats - you are on the guestlist",
			});
		} else {
			res.status(200).json({
				message: "Hope to see you at the next one!",
			});
		}
	} catch (err) {
		next(err);
	}
}
///I AM NOT GOING BUTTON
async function del(req, res, next) {
	try {
		const { inviteId } = req.params;
		await db.removeInvite(inviteId);
		res.status(200).json({
			message: "You have been removed from the guestlist of this potluck",
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getInvitedGuests,
	getPotluckInvites,
	post,
	put,
	del,
};
