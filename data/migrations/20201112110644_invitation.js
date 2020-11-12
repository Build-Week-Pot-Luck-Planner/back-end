
exports.up = async function (knex) {
    await knex.schema.createTable("invitation", (table) => {
        table.increments();
        table.integer("guestId").references("id").inTable("users")
        table.integer("potluckId").references("id").inTable("potlucks")
        table.integer("status").defaultTo(0)
    })
};

exports.down = async function (knex) {
    return knex.schema.dropTableIfExists("invitation");
};
