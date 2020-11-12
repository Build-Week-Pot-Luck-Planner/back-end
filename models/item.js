const db = require("../data/db");

function getItemsByPotluckId(potluckId) {
// returns all items required to be brought to a particular potluck
    return db("items as i")
        .innerJoin("potlucks as p", "p.id", "i.potluckId")
        .where("p.id", potluckID)
        .select("i.name")
}


function getItemsByUserId(userID) {
    //Returns the item a user is required to bring. 
    return db("items as i")
    .innerJoin("users as u", "u.id", "i.id")
    .where("u.id", userID)
    .select("i.*")
}

module.exports = {
    getItemsByUserId,
    getItemsByPotluckId
}