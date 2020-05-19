const db = require("../../../database/dbConfig");
const { v1: uuidv1 } = require("uuid");
module.exports = {
  add,
  remove,
  update,
  getOrdersBy,
  getAllOrders,
  findById,
};

function getAllOrders() {
  return db("orders").then((orders) => {
    orders.forEach((order) => {
      order.transaction_info = JSON.parse(order.transaction_info);
      order.order_items = JSON.parse(order.order_items);
    });
    return orders;
  });
}

function getOrdersBy(filter) {
  console.log(filter);
  return db("orders")
    .where(filter)
    .then((orders) => {
      orders.forEach((order) => {
        order.transaction_info = JSON.parse(order.transaction_info);
        order.order_items = JSON.parse(order.order_items);
      });
      return orders;
    });
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

function findById(id) {
  return db("orders")
    .where({ id })
    .first()
    .then((order) => {
      order.transaction_info = JSON.parse(order.transaction_info);
      order.order_items = JSON.parse(order.order_items);

      return order;
    });
  //   .join("users", "shops.user_id", "=", "users.id")
  //   .select(selectedData);
}

async function add(order) {
  const payer_info = order.transaction_info.payer.payer_info;
  let { user_id } = await db("shops").where({ id: order.shop_id }).first();
  order.user_id = user_id;
  order.email = payer_info.email;
  order.first_name = payer_info.first_name;
  order.last_name = payer_info.last_name;
  order.transaction_info = JSON.stringify(order.transaction_info);
  order.order_items = JSON.stringify(order.order_items);
  order.id = "ON-" + uuidv1();
  await db("orders").insert(order, "id");
  console.log(order.id);
  return findById(order.id);
}

function remove(id) {
  return db("orders").where({ id }).del();
}

function update(id, changes) {
  // console.log(id,changes)
  changes.transaction_info = JSON.stringify(changes.transaction_info);
  changes.order_items = JSON.stringify(changes.order_items);

  return db("orders")
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
