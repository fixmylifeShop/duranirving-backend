exports.up = function (knex) {
  return knex.schema.createTable("product_photos", (tbl) => {
    tbl
      .integer("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();

    tbl.string("image").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_photos");
};
