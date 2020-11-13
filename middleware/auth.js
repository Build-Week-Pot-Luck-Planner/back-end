const jwt = require("jsonwebtoken");

function restricted(req, res, next){
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: "Token not provided"});
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }catch(err){
        res.status(401).json({message: "Invalid token", err});
    }
}

module.exports = {
    restricted
}