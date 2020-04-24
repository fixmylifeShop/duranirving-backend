exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("email", 128).notNullable().unique();

    tbl.string("password", 128);

    tbl.string("first_name", 128);

    tbl.string("last_name", 128);

    tbl.string("phone", 128);

    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
