const db = require("../../data/db");
const guestsModel = require("../../models/eventGuests");

describe("getGuests Tests", () => {
    it("Should return all guests", async () => {
        const guests = await guestsModel.getAttendingGuestsByPotluckId(1);

        expect(Array.isArray(guests)).toBe(true);
        expect(guests).toHaveLength(1);
        expect(guests[0].potluckId).toBe(1);
    });

    // it("Should return an array of all guests matching a query", async () => {
    //     let guests = await guestsModel.getAttendingGuestsByPotluckId(1);
    //     expect(guests).toHaveLength(1);
    //     expect(guests[0].username).toBe("Test");

    //     guests = await guestsModel.getAttendingGuestsByPotluckId("o");

    //     expect(guests).toHaveLength(1);
    //     expect(guests[0].username).toBe("Bob");
    // });
});