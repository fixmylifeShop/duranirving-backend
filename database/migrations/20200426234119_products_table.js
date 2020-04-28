exports.up = function (knex) {
  return knex.schema.createTable("products", (tbl) => {
    tbl
      .integer("shop_id")
      .references("id")
      .inTable("shops")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();

    tbl.string("product_name").notNullable();

    tbl.string("description", 1000);

    tbl.integer("price");

    tbl.string("image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");

};
