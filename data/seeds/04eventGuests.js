exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("eventGuests")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("eventGuests").insert([
				{
					guestId: 1,
					potluckId: 1,
				},
				{
					guestId: 2,
					potluckId: 2,
				},
				{
					guestId: 3,
					potluckId: 3,
				},
			]);
		});
};
