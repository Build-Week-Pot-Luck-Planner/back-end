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

async function getUser(req, res){
    const userId = req.params.userId;
    if(req.user.id != userId) return res.status(403).json({message: "Unauthorized"});
    
    try {
        const user = await db.getUserWithPotlucks(userId);
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function updateUser(req, res){
    const userId = req.params.userId;
    if(req.user.id != userId) return res.status(403).json({message: "Unauthorized"});
    
    try {
        const userExists = await db.getById(userId);
        if(!userExists) return res.status(404).json({message: "User not found"});

        const updatedUser = await db.updateUser(userId, req.body);
        if(updatedUser.err) return res.status(400).json({message: updatedUser.err});
        res.status(200).json({message: "Your account info was updated", user: updatedUser});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser
}