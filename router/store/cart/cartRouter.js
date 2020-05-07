const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.cookies.StoreFront) {
    res.status(200).json(req.cookies.StoreFront);
  } else {
    res.status(200).json([]);
  }
});

router.post("/", (req, res) => {
  if (req.body) {
    res.cookie("StoreFront", req.body);
    return res
      .status(200)
      .json(req.body);
  } else {
    res.end();
  }
});

module.exports = router;
