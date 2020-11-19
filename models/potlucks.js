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

    const itemsArr = []
    for(let item of items){
        itemsArr.push({
            name: item,
            potluckId: potluck.id
        });
    }
    await db("item").insert(itemsArr);
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

async function updatePotluck(potluckId, changes){
    let items = changes.items;
    changes = {
        title: changes.title || undefined,
        when: changes.when || undefined,
        location: changes.location || undefined
    }
    if(changes.title || changes.when || changes.location){
        await db("potlucks as p")
        .update(changes);
    }

    //the following for updating items isn't really the best way but its the fastest and easiest
    //for now with the current front-end design; could be refactored lated
   
    //delete all items
    await db("item as i")
    .where({potluckId})
    .del();

    //recreate them with the changes
    const newItems = [];
    if(items){
        for(let item of items){
            newItems.push({
                name: item,
                potluckId: potluckId
            });
        }
        if(newItems[0]) await db("item").insert(newItems);
    }
    
    return getPotluck(potluckId);
}

async function deletePotluck(potluckId, userId){
    if(!potluckId) throw new Error("Potluck id must be provided");
    
    const potluckToDelete = await db("potlucks").where({id: potluckId}).first();
    if(potluckToDelete && potluckToDelete.organizerId !== userId) throw new Error("This is not your potluck");
    if(potluckToDelete) await db("potlucks").where({id: potluckId}).del();
    return potluckToDelete;
}

module.exports = {
    getUsersPotlucks,
    createPotluck,
    getPotluck,
    updatePotluck,
    deletePotluck
}