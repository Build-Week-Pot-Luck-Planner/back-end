exports.up = function(knex) {
    return knex.schema.createTable("users", table=>{
        table.increments();
        table.string("email").notNullable().unique();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
        table.string("pfp").defaultTo("https://64.media.tumblr.com/ac5af271a7b2cff39f4b44d1b1608f23/219c790c4b028ed5-87/s640x960/b7344c1c147fbeb5586b8f2395fdf24c70d11749.jpg");
        table.string("location");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
