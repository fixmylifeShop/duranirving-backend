const db = require("../../../database/dbConfig");

module.exports = {
  add,
  remove,
  update,
  getShopProducts,
  getAllProducts,
  findById,
};

function getAllProducts() {
  return db("products");
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

function getShopProducts(shop_id) {
  return db("products").where({ shop_id });
  //   .join("users", "products.user_id", "=", "users.id")
  //   .select(selectedData);
}

//   function getUserShops(id) {
//     return db("products")
//       .where("products.user_id", id)
//     //   .join("users", "products.user_id", "=", "users.id")
//     //   .select(selectedData);
//   }

function findById(id) {
  return db("products").where({ id }).first();
  //   .join("users", "products.user_id", "=", "users.id")
  //   .select(selectedData);
}

async function add(product) {
  const [id] = await db("products").insert(product, "id");
  const addImage = { product_id: id, image: product.image };
  console.log(addImage)
  await db("product_photos").insert(addImage);
  
  return findById(id);
}

function remove(id) {
  return db("products").where({ id }).del();
}

function update(id, changes) {
  return db("products")
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
