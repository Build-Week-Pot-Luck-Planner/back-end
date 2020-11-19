const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{
					email: "test@gmail.com",
					username: "Test",
					password: bcrypt.hashSync("password", Number(process.env.NUM_OF_HASHES)),
				},
				{
					email: "bob@gmail.com",
					username: "Bob",
					password: bcrypt.hashSync("password", Number(process.env.NUM_OF_HASHES)),
				},
				{
					email: "sarah@gmail.com",
					username: "sarah",
					password: bcrypt.hashSync("password", Number(process.env.NUM_OF_HASHES)),
				},
			]);
		});
};
