const db = require("../../data/db");
const invitationsModel = require("../../models/invitation");
const eventGuestsModel = require("../../models/eventGuests");

afterAll(async () => {
	await db.seed.run();
	await db.destroy();
});

//INVITATIONS

describe("get invitations tests", () => {
	it("Should get a list of all the invitations sent for a particular potluck", async () => {
		const invitations = await invitationsModel.getInvitedGuestsByPotluckId(1);
		expect(invitations).toHaveLength(2);
	});
});

describe("post invitations tests", () => {
	it("create an invitation to a potluck", async () => {
		const afterInviteInvitations = await invitationsModel.addInvite({guestId: 3, potluckId: 1, status: 0},1);
		expect(afterInviteInvitations).toHaveLength(1);
	});
});

describe("put invitations tests", () => {
	it("update an invitation to attending", async () => {
		await invitationsModel.updateInvite({status: 0, guestId: 3, potluckId: 1}, 1);
		const eventGuests = await eventGuestsModel.getAttendingGuestsByPotluckId(1);
		expect(eventGuests).toHaveLength(1);
	});
});


//EVENT GUESTS

