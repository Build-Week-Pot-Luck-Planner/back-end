const db = require("../models/users");

async function getUsers(req, res){
    const searchQuery = req.query.username;
    try {
        const users = await db.getUsers(searchQuery);
        res.status(200).json({users});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

module.exports = {
    getUsers
}