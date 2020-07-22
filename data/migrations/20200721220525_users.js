exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").unique().notNull();
    table.string("password").notNull();
    table.string("phoneNumber").notNull();
  })
  .createTable("plants", (table) => { 
    table.increments("id");
    table.string("nickname").notNull();
    table.string("species").notNull();
    table.string("h2oFrequency").notNull();
  })
  .createTable("users_plants", (table) => {
    table.integer("user_id")
          .unsigned()
          .notNull()
          .references("id")
          .inTable("users")
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
    table.integer("plant_id")
          .unsigned()
          .notNull()
          .references("id")
          .inTable("plants")
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
  });
};

exports.down = async function (knex) {
  await knex.schema
  .dropTableIfExists("users_plants")
  .dropTableIfExists("plants")
  .dropTableIfExists("users")
};
