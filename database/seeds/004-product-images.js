exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_photos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product_photos").insert([
        {
          product_id: 1,
          image:
            "https://assets.bigcartel.com/product_images/220592533/PhotoGrid_1532186785882.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 1,
          image:
            "https://assets.bigcartel.com/product_images/174915649/XL_roll-1.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 1,
          image:
            "https://assets.bigcartel.com/product_images/220592308/PhotoGrid_1532186456902.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 1,
          image:
            "https://assets.bigcartel.com/product_images/191324771/IMG_20170107_235622_017.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 2,
          image:
            "https://assets.bigcartel.com/product_images/220592533/PhotoGrid_1532186785882.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 2,
          image:
            "https://assets.bigcartel.com/product_images/220592308/PhotoGrid_1532186456902.jpg?auto=format&fit=max&w=1500",
        },
        {
          product_id: 2,
          image:
            "https://assets.bigcartel.com/product_images/191324771/IMG_20170107_235622_017.jpg?auto=format&fit=max&w=1500",
        },
      ]);
    });
};
