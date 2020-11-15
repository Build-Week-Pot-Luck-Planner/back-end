exports.up = async function (knex) {
	await knex.schema.createTable("item", (table) => {
		table.increments();
		table.text("name").notNull();
		table
			.integer("guestResponsible")
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
	});
};

exports.down = async function (knex) {
	return knex.schema.dropTableIfExists("item");
};
