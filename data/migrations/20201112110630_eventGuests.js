exports.up = async function (knex) {
	await knex.schema.createTable("eventGuests", (table) => {
		table.increments();
		table.integer("guestId").references("id").inTable("users");
		table.integer("potluckId").references("id").inTable("potlucks");
	});
};

exports.down = async function (knex) {
	return knex.schema.dropTableIfExists("eventGuests");
};
