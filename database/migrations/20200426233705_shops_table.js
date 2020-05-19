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

      tbl
        .string("store_logo")
        .defaultTo(
          "https://fulltummyfund.co.za/wp-content/uploads/2017/01/PlaceholderLogo.png"
        );

      tbl.boolean("maintenance").defaultTo(0);

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

      // tbl.string("image");

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
    })
    .createTable("orders", (tbl) => {
      // tbl.increments()

      tbl.uuid('id').primary()

      tbl
        .integer("shop_id")
        .references("id")
        .inTable("shops")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();

      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .notNullable();

      tbl.string("email", 128);

      tbl.string("first_name", 128);

      tbl.string("last_name", 128);

      tbl.json("transaction_info");

      tbl.json("order_items");

      tbl.boolean("shipped").defaultTo(0);

      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("shops")
    .dropTableIfExists("shop_views")
    .dropTableIfExists("products")
    .dropTableIfExists("product_photos")
    .dropTableIfExists("orders");
};
