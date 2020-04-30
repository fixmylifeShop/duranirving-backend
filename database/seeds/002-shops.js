exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("shops")
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex("shops").insert([
          {
            user_id: 1,
            store_name: "fixmylife shop",
            store_url: "fmlcycling.com",
            store_logo:
              "https://github.com/fixmylifeShop/fixmylife-frontend/blob/master/src/images/fixmylifelogo.png?raw=true",
          },
          {
            user_id: 1,
            store_name: "durancycles shop",
            store_url: "fmlcycling.com",
            store_logo:
              "https://assets.bigcartel.com/theme_images/27066146/PhotoGrid_1476146082387.jpg",
          },
        ]);
      })
  );
};
