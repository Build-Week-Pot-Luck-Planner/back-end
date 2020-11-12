const db = require("../data/db");
const bcrypt = require("bcryptjs");

function getByUsername(username){
    return db("users").where({username}).first();
}

async function createUser(email, username, password, pfp, location){
    const hash = bcrypt.hashSync(password, process.env.NUM_OF_HASHES);
    const data = {email, username, password: hash, location};
    //only sets pfp attribute if one is given
    //if not given it will default to value set in table migration
    if(pfp) data.pfp = pfp;
    const newUserId  = await db("users").insert(data);
    
    const newUser = await db("users").where({id: newUserId[0]}).first();
    delete newUser.password;
    return newUser
}

module.exports = {
    getByUsername,
    createUser
}