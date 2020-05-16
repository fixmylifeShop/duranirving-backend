const db = require("../../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getUserShops,
  getAllShops,
  findById,
};

function getAllShops() {
  return db("shops");
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

function getUserShops(id) {
  return db("shops").where("shops.user_id", id)
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

function findById(id) {
  return db("shops").where({ id }).first();
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

async function add(shop) {
  const [id] = await db("shops").insert(shop, "id");

  return findById(id);
}

function remove(id) {
  return db("shops").where({ id }).del();
}

function update(id, changes) {
  return db("shops")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return findById(id);
      } else {
        return null;
      }
    });
}
