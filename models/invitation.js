const db = require("../data/db");

function getInvitedGuestsByPotluckId(potluckID) {
    //Returns a list of all guests invited to the potluck
    return db("eventGuests as g")
        .innerJoin("users as u", "u.id", "g.id")
        .innerJoin("potlucks as p", "p.id", "g.potluckId")
        .where("g.id", potluckID)
        .select("p.title", "u.username")
}

module.exports = {
    getInvitedGuestsByPotluckId,
}