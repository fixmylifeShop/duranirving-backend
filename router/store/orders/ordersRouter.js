const router = require("express").Router();
const Orders = require("./ordersModel");

router.get("/", (req, res) => {
  Orders.getAllOrders()
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.headers.shop_id);
  const body = req.body;
  body.shop_id = req.headers.shop_id;
  Orders.add(body)
    .then((added) => res.status(201).json(added))
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
