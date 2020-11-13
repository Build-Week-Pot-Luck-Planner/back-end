const db = require("../data/db");

function getInvitedGuestsByPotluckId(potluckID) {
    //Returns a list of all guests invited to the potluck
    return db("eventGuests as g")
        .innerJoin("users as u", "u.id", "g.id")
        .innerJoin("potlucks as p", "p.id", "g.potluckId")
        .where("g.id", potluckID)
        .select("p.title", "u.username")
}

function addInvite(data) {
    return db("invitation as i").insert(data);
}

function updateInvite(changes, id) {
    return db("invitation as i").where("id", id).update(changes);
}

function removeInvite(id) {
    return db("invitation as i").where("id", id).del();
}

module.exports = {
    getInvitedGuestsByPotluckId,
    addInvite,
    updateInvite,
    removeInvite
}