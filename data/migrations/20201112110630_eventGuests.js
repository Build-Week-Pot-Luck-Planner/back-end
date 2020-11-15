exports.up = async function (knex) {
	await knex.schema.createTable("eventGuests", (table) => {
		//we do not want a user to be invited to the same potluck twice
		table.increments();
		table
			.integer("guestId")
			.references("id")
			.inTable("users")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
			.notNull();
		table
			.integer("potluckId")
			.references("id")
			.inTable("potlucks")
			.onUpdate("CASCADE")
			.onDelete("CASCADE")
			.notNull();
		table.unique(["potluckId", "guestId"]);
	});
};

exports.down = async function (knex) {
	return knex.schema.dropTableIfExists("eventGuests");
};
