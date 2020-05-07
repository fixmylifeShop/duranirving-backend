const db = require("../../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getProductImages,
  getAllImages,
  findById,
};

function getAllImages() {
  return db("product_photos");
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

function getProductImages(product_id) {
  return db("product_photos").where({product_id});
  //   .join("users", "products.user_id", "=", "users.id")
  //   .select(selectedData);
}

function findById(id) {
  return db("product_photos").where({ id }).first();
  //   .join("users", "products.user_id", "=", "users.id")
  //   .select(selectedData);
}

async function add(image) {
  // console.log(image)
  const [id] = await db("product_photos").insert(image, "id");

  return findById(id);
}

function remove(id) {
  return db("product_photos").where({ id }).del();
}

function update(id, changes) {
  return db("product_photos")
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
