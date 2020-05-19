const router = require("express").Router();
const Orders = require("./ordersModel");
const restricted = require("../../auth/middleware/restrictedMiddleware");
router.get("/", (req, res) => {
  Orders.getAllOrders()
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/user/", restricted, (req, res) => {
  console.log("hello");

  const user_id = req.decodedToken.id;
  console.log(user_id);
  Orders.getOrdersBy({ user_id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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


router.get("/users/:id", (req, res) => {
  const user_id = req.params.id;
  Orders.getOrdersBy({ user_id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/shop/:id", (req, res) => {
  const shop_id = req.params.id;
  Orders.getOrdersBy({ shop_id })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // console.log(req.headers.shop_id);
  const body = req.body;
  body.shop_id = req.headers.shop_id;
  Orders.add(body)
    .then((added) => res.status(201).json(added))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Orders.update(id, body)
    .then((added) => res.status(201).json(added))
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
