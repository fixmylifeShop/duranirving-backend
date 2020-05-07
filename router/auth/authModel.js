const db = require("../../database/dbConfig");

module.exports = {
  find,
  findBy,
  add,
  findById,
  findByEmail,
};

const selection = [
  "id",
  "email",
  "first_name",
  "last_name",
  "phone",
  "created_at",
  "updated_at",
];

function find() {
  return db("users").select(selection);
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first()
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first().select(selection);
}

function findByEmail(email) {
  return db("users").where({ email }).first();
}
