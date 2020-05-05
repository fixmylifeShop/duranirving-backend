exports.up = function (knex) {
  return knex.schema
    .createTable("shops", (tbl) => {
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();

      tbl.increments();

      tbl.string("store_name").notNullable();

      tbl.string("store_url").notNullable();

      tbl.string("store_logo");

      tbl.timestamps(true, true);
    })
    .createTable("shop_views", (tbl) => {
      tbl
        .integer("shop_id")
        .references("id")
        .inTable("shops")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();

      tbl.increments();

      tbl.integer("fixed_count").defaultTo(0);

      tbl.timestamps(true, true);
    })
    .createTable("products", (tbl) => {
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

      tbl.timestamps(true, true);
    })
    .createTable("product_photos", (tbl) => {
      tbl
        .integer("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();

      tbl.increments();

      tbl.string("image").notNullable();

      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("shops")
    .dropTableIfExists("shop_views")
    .dropTableIfExists("products")
    .dropTableIfExists("product_photos");
};
