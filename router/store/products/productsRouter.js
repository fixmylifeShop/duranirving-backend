const router = require("express").Router();
const Products = require("./productsModel");
const ProductImages = require("../productImages/productImagesModel");

const {
  uploadImageToStorage,
  multer,
} = require("../../../components/googleCloudUploader.js");

router.get("/all", (req, res) => {
  Products.getAllProducts()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all products" });
    });
});

router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      ProductImages.getProductImages(product.id)
        .then((images) => {
          product.image = images;
          res.status(200).json(product);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.post("/", multer.single("file"), (req, res) => {
  let file = req.file;
  const product = req.body;

  const send = (input) => {
    Products.add(input)
      .then((inserted) => {
        let image = input.image;
        if (image) {
          ProductImages.add({ product_id: input.shop_id, image})
            .then((first) => {
              inserted.images = first.image;
              res.status(201).json(inserted);
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        } else {
          res.status(201).json(inserted);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  if (file) {
    uploadImageToStorage(file)
      .then((img) => {
        product.image = img;
        send(product);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    send(product);
  }
});

module.exports = router;
