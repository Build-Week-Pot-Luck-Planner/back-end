const db = require("../../data/db");
const item = require("../../models/item");

describe("getGuests Tests", () => {
    it("Should return all iems", async () => {
        const items = await item.getItemsByPotluckId(1);
console.log(items)
        expect(Array.isArray(items)).toBe(true);
        expect(items).toHaveLength(3);
        expect(items[0].potluckId).toBe(1);
    });

    // it("Should return an array of all items matching a query", async () => {
    //     let guests = await guestsModel.getAttendingGuestsByPotluckId(1);
    //     expect(guests).toHaveLength(1);
    //     expect(guests[0].username).toBe("Test");

    //     guests = await guestsModel.getAttendingGuestsByPotluckId("o");

    //     expect(guests).toHaveLength(1);
    //     expect(guests[0].username).toBe("Bob");
    // });
});