const db = require("../models/eventGuests");

//GET ALL THE PEOPLE WHO ARE GOING TO A PARTICULAR POTLUCK
async function getEventGuests(req, res, next) {
	try {
		const { id } = req.params;
		const attendingGuests = await db.getAttendingGuestsByPotluckId(id);
		if (attendingGuests === []) {
            return res.status(404).json({
                 message: "no one has rsvp'd to the event yet"
             });
        }
        res.status(200).json(attendingGuests);
	} catch (err) {
		next(err);
	}
}

//REMOVE A GUEST FROM THE EVENT LIST

async function delEventGuests(req, res, next) {
	try {
		const { guestId } = req.params;
		await db.removeGuest(id);
		res.status(200).json({
			message: "Guest successfully removed from guestlist",
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getEventGuests,
	delEventGuests,
};
