const router = require("express").Router();

const Shops = require("./shopsModel")

router.get("/", (req, res) => {
    Shops.getAllShops()
      .then(shop => {
        res.status(200).json(shop);
      })
      .catch(error => {
        res
          .status(500)
          .json({ req, error, message: "error retrieving all shops" });
      });
  });

  router.post("/", async (req, res) => {
    const shop = req.body;
    // if (shop.description && shop.image) {
      try {
        const inserted = await Shops.add(shop);
        res.status(201).json(inserted);
      } catch (error) {
        res
          .status(500)
          .json({ error, message: "we ran into an error creating your store" });
      }
    // } else {
    //   res.status(400).json({ message: "Please provide a description" });
    // }
  });

module.exports = router;