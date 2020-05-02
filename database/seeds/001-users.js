const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex("users")
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex("users").insert([
          {
            id: 1,
            email: "ijd.irving@gmail.com",
            password: bcrypt.hashSync("password", 10),
            first_name: "irving",
            last_name: "duran",
            phone: "3476655234",
            // created_at: "2015-05-02 02:45:57"
          },
          {
            id: 2,

            email: "durancycles@gmail.com",
            password: bcrypt.hashSync("password", 10),
            first_name: "irving",
            last_name: "duran",
            phone: "3476655234",
            // created_at: "2017-05-02 02:45:57"
          },
          {
            email: "fixmylifenyc@gmail.com",
            password: bcrypt.hashSync("password", 10),
            first_name: "irving",
            last_name: "duran",
            phone: "3476655234",
            // created_at: "2020-05-02 02:45:57"
          },
        ]);
      })
  );
};
