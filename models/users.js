const db = require("../data/db");
const bcrypt = require("bcryptjs");

function getUsers(username=""){
    return db("users").where("username", "like", `${username}%`).select("email", "username", "pfp", "location");
}

function getByUsername(username){
    return db("users").where({username}).first();
}

async function createUser(email, username, password, pfp, location){
    const hash = bcrypt.hashSync(password, Number(process.env.NUM_OF_HASHES));
    const data = {email, username, password: hash, location};
    //only sets pfp attribute if one is given
    //if not given it will default to value set in table migration
    if(pfp) data.pfp = pfp;
    const newUserId  = await db("users").insert(data).returning("id");
    
    const newUser = await db("users").where({id: newUserId[0]}).first();
    delete newUser.password;
    return newUser
}

async function updateUser(userId, changes){
    if(!userId) throw new Error("User id must be provided");
    //all updates should be optional, so we'll take in an object of fields with their changes
    //whatever properties are added on the changes object will be the only properties that change    
    //ex. a req.body of {username: 'newUsername'} will update the username but leave all other fields the same
    //ex. a req.body of {email: "email@gmail.com", pfp: 'someurl.com'} will update email and pfp only but leave all other fields the same
    
    //the following makes sure only fields that need to be updated are updated
    //and only valid fields are passed to .update
    changes = {
        email: (changes.email)? changes.email: undefined, 
        username: (changes.username)? changes.username: undefined,
        password: (changes.password)? bcrypt.hashSync(changes.password, process.env.NUM_OF_HASHES): undefined,
        pfp: (changes.pfp)? changes.pfp: undefined,
        location: (changes.location)? changes.location: undefined
    }
    // knex won't allow us to push an empty object to the .update method
    // this variable tracks if the changes object only has undefined values
    // if it does, we will skip the update query and just return the user object as is
    let changesExist = false;
    for(let field in changes){
        if (changes[field]) changesExist = true;
    }

    if(changesExist) await db("users").where({id: userId}).update(changes);
    return db("users").where({id: userId}).first();
}

async function deleteUser(userId){
    if(!userId) throw new Error("User id must be provided");
    
    const userToDelete = await db("users").where({id: userId}).first();
    if(userToDelete) await db("users").where({id: userId}).del();
    return userToDelete;
}

async function getUserWithPotlucks(userId){
    if(!userId) throw new Error("User id must be provided");

    const user = await db("users as u")
    .leftJoin("potlucks as p", "p.organizerId", "u.id")
    .where("u.id", userId)
    .select("u.id", "u.username", "u.email", "u.pfp", "u.location",
    "p.id as potluckId", "p.title", "p.organizerId", "p.when", "p.location")
    .first();

    return user;
}

module.exports = {
    getUsers,
    getByUsername,
    createUser,
    updateUser,
    deleteUser,
    getUserWithPotlucks
}