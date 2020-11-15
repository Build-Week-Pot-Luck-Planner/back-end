const db = require("../data/db.js");

function getById(id) {
	return db("users").where({ id }).first();
}

function validateUserId(req, res, next) {
	return (req, res, next) => {
		userDb
			.getById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404).json({
						message: "User not found",
					});
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: "Error retrieving the user",
				});
			});
	};
}

module.exports = {
	getById,
	validateUserId
};