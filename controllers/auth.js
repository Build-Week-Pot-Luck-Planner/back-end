const db = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res){
    const {email, username, password, pfp, location} = req.body;

    if(!email) return res.status(400).json({message: "Email required"});
    if(!username) return res.status(400).json({message: "Username required"});
    if(!password) return res.status(400).json({message: "Password required"});

    try {
        const userExists = await db.getByUsername(username);
        if(userExists) return res.status(400).json({message: "Username taken"});

        const newUser = await db.createUser(email, username, password, pfp, location);
        res.status(201).json({user: newUser, message: "Your account was created"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function auth (req, res, next) {
		try {
			const { username, password } = req.body;
			const user = await db.getByUsername(username);
			const passwordValid = await bcrypt.compare(password, user.password);
			if (!passwordValid) {
				return res.status(401).json({
					message: "Invalid Credentials",
				});
			}
			const token = jwt.sign(
				{
					userID: user.id,
				},
				process.env.JWT_SECRET
			);
			
			res.json({
				message: `Welcome ${user.username}`,
			});
		} catch (err) {
			next(err);
		}
	};

module.exports = {
    auth,
    signup
}