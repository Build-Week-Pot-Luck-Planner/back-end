exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("invitation")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("invitation").insert([
				{
					guestId: 1,
					potluckId: 1,
					status: 0,
				},
				{
					guestId: 2,
					potluckId: 2,
					status: 0,
				},
				{
					guestId: 3,
					potluckId: 1,
					status: 0,
				},
			]);
		});
};
