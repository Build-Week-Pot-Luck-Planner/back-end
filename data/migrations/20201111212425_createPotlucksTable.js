exports.up = function(knex) {
    return knex.schema.createTable("potlucks", table=>{
        table.increments();
        table.integer("organizerId").notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        table.string("title").notNullable();
        table.datetime("when").notNullable();
        table.string("location").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("potlucks", table=>{

    });
};
