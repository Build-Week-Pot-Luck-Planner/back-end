const db = require("../data/db");

function getUsersPotlucks(userId){
    return db("potlucks")
    .where({organizerId: userId});
}

async function createPotluck(organizerId, title, when, location, items){
    const newPotluckId = await db("potlucks")
    .insert({
        organizerId,
        title,
        when,
        location
    }).returning("id");
    const potluck = await db("potlucks").where({id: newPotluckId[0]}).first();

    for(let item of items){
        await db("item")
        .insert({name: item, potluckId: potluck.id})
    }
    items = await db("item").where({potluckId: potluck.id});

    potluck.items = items;
    return potluck;
}

async function getPotluck(potluckId){
    const potluck = await db("potlucks as p")
    .leftJoin("users as u", "u.id", "p.organizerId")
    .where("p.id", potluckId)
    .select("p.id as potluckId", "p.title", "p.when", "p.location",
    "u.id as organizerId", "u.username as organizerUsername", "u.pfp as organizerPfp", "u.location as organizerLocation")
    .first();

    const items = await db("item as i")
    .leftJoin("users as g", "g.id", "i.guestResponsible")
    .select("i.name", "i.potluckId",
    "g.username as guestUsername", "g.id as guestId", "g.pfp as guestPfp", "g.location as guestLocation")
    .where("i.potluckId", potluckId);

    const guests = await db("eventGuests as g")
    .leftJoin("users as u", "u.id", "g.guestId")
    .select("u.id", "u.username", "u.pfp", "u.location")
    .where("g.potluckId", potluckId);

    potluck.items = items;
    potluck.guests = guests;
    return potluck;
}

module.exports = {
    getUsersPotlucks,
    createPotluck,
    getPotluck
}