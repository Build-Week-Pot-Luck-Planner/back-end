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
		const token = generateToken({id: newUser.id});
        res.status(201).json({token, message: "Your account was created"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "A server error occurred", err});
    }
}

async function auth (req, res, next) {
		try {
			const { username, password } = req.body;
			const user = await db.getByUsername(username);
			if(!user) return res.status(401).json({message: "Invalid Credentials"});
			const passwordValid = await bcrypt.compare(password, user.password);
			if (!passwordValid) {
				return res.status(401).json({
					message: "Invalid Credentials",
				});
			}

			const token = generateToken({id: user.id});

			
			res.json({
				token,
				message: `Welcome ${user.username}`,
			});
		} catch (err) {
			next(err);
		}
	};

function generateToken(payload){
	return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
}

module.exports = {
    auth,
    signup
}