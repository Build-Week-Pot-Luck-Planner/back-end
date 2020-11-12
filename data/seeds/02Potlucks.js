exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("potlucks")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("potlucks").insert([
				{
					title: "Potluck 1",
					organizerId: 1,
					when: "2021-11-04 09:50:34",
					location: "123 Place St, New York NY",
				},
				{
					title: "Potluck 2",
					organizerId: 2,
					when: "2021-01-20 12:04:12",
					location: "123 Somewhere Ave, Washington DC",
				},
				{
					title: "Another Potluck",
					organizerId: 1,
					when: "2021-04-21 16:12:43",
					location: "1786 Redwood Rd, Seattle WA",
				},
			]);
		});
};
