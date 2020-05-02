exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("shop_views")
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex("shop_views").insert([
          {
            shop_id: 1,
            fixed_count: 0,
            created_at: "2014-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 3010,
            created_at: "2015-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 30905,
            created_at: "2016-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 15864,
            created_at: "2017-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 1117,
            created_at: "2018-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 893,
            created_at: "2019-05-02 02:41:33",
          },
          {
            shop_id: 1,
            fixed_count: 161,
            created_at: "2020-05-02 02:41:33",
          },
        ]);
      })
  );
};
