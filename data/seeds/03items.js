exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("item")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("item").insert([
				{
          name: "Cucumber Tomato Salad",
					guestResponsible: 1,
					potluckId: 1,
				},
				{
          name: "Baked Garlic Parmesan Puffs",
					guestResponsible: 2,
					potluckId: 1,
				},
				{
          name: "Garlic Parmesan Roasted Shrimp with Mango Dipping Sauce",
					guestResponsible: 3,
					potluckId: 1,
        },
        {
          name: "Fresh Pineapple Salsa with Sesame Tortilla Chips",
          guestResponsible: 1,
          potluckId: 2,
        },
        {
          name: "Goat Cheese Grape Balls",
          guestResponsible: 2,
          potluckId: 2,
        },
        {
          name: "Raspberry & Peach Sugar Cookies",
          guestResponsible: 3,
          potluckId: 2,
        },
        {
          name: "Roasted Chickpea & Avocado Dip",
          guestResponsible: 1,
          potluckId: 3,
        },
        {
          name: "Pepperoni Basil Tomato Puffs",
          guestResponsible: 2,
          potluckId: 3,
        },
        {
          name: "Lime Zucchini Matcha Muffins",
          guestResponsible: 3,
          potluckId: 3,
        },
			]);
		});
};
