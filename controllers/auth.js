const usersModel = require("../models/users");

async function signup(req, res){
    const {email, username, password, pfp, location} = req.body;

    if(!email) return res.status(400).json({message: "Email required"});
    if(!username) return res.status(400).json({message: "Username required"});
    if(!password) return res.status(400).json({message: "Password required"});

    try {
        const userExists = await usersModel.getByUsername(username);
        if(userExists) return res.status(400).json({message: "Username taken"});

        const newUser = await usersModel.createUser(email, username, password, pfp, location);
        res.status(201).json({user: newUser, message: "Your account was created"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

module.exports = {
    signup
}