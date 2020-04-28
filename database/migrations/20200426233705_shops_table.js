exports.up = function (knex) {
  return knex.schema.createTable("shops", (tbl) => {
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();

    tbl.string("store_name").notNullable();

    tbl.string("store_logo");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("shops");
};
