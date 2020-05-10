const router = require("express").Router();
const generate = require("../../../token");
const jwt = require("jsonwebtoken");
const secrets = require("../../auth/middleware/secrets");

router.get("/", (req, res) => {
  const token = req.headers.cart;

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      res.status(200).json({ cart: [] });
    } else {
      return res.status(200).json({ cart: decodedToken.cart, token });
    }
  });
});

router.post("/", (req, res) => {
  if (req.body) {
    let token = generate.cartToken(req.body);
    return res.status(200).json({ cart: req.body, token });
  } else {
    return res.status(200).json({ cart: [], message:"cart Empty" });
  }
});

// router.get("/", (req, res) => {
//   if (req.cookies.StoreFront) {
//     res.status(200).json(req.cookies.StoreFront);
//   } else {
//     res.status(200).json([]);
//   }
// });

// router.post("/", (req, res) => {
//   if (req.body) {
//     res.cookie("StoreFront", req.body);
//     return res
//       .status(200)
//       .json(req.body);
//   } else {
//     res.end();
//   }
// });

module.exports = router;
