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
          },
          {
            id: 2,

            email: "durancycles@gmail.com",
            password: bcrypt.hashSync("password", 10),
            first_name: "irving",
            last_name: "duran",
            phone: "3476655234",
          },
          {
            email: "fixmylifenyc@gmail.com",
            password: bcrypt.hashSync("password", 10),
            first_name: "irving",
            last_name: "duran",
            phone: "3476655234",
          },
        ]);
      })
  );
};
