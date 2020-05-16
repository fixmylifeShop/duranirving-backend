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
}

function getShopProducts(shop_id) {
  return db("products")
    .where({ shop_id })
    .then((products) => {
      products.map(async (product) => {
        db("product_photos")
          .where({ product_id: product.id })
          .first()
          .then((res) => {
            return (product.image = res.image);
          });
      });
      return products;
    });
}

function findById(id) {
  return db("products").where({ id }).first();
  //   .join("users", "products.user_id", "=", "users.id")
  //   .select(selectedData);
}

async function add(product) {
  let {description, image, price, product_name, shop_id} = product
  let insertProduct = {description,price, product_name, shop_id}
  const [id] = await db("products").insert(insertProduct, "id");
  const addImage = { product_id: id, image };
  
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
