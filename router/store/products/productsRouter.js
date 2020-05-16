const router = require("express").Router();
const Products = require("./productsModel");
const ProductImages = require("../productImages/productImagesModel");
const upload = require("../../../components/cloudinaryUploader");

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

// make middleware to check if exist
router.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      ProductImages.getProductImages(product.id)
        .then((images) => {
          product.images = images;
          res.status(200).json(product);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the shop" });
    });
});

// check user owns photo or admin
router.post("/", (req, res) => {
  // let file = req.files.file;
  const product = req.body;
// console.log(product)
  const send = (input, image_url) => {
    Products.add(input)
      .then((inserted) => {
            res.status(201).json(inserted);
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json(error);
      });
 
  };

  if (req.files) {
    let file = req.files.file;
    upload(file.tempFilePath, (error, result) => {
      if (result && result.url) {
        product.image = result.url;
        send(product,result.url);
      } else {
        res.status(500).json(error);
      }
    });
  } else {
    send(product);
  }
});

router.put("/:id", (req,res) => {
  const id = req.params.id;
  const changes = req.body;
  Products.update(id, changes)
  .then((update) => {
    res.status(200).json(update);
  })
  .catch((error) => {
    res.status(500).json({
      errorMessage: error,
    });
  });
})

// make middleware to check if exist
// check user owns photo or admin
router.delete("/:id", (req, res) => {
  Products.remove(req.params.id)
    .then((del) => {
      res
        .status(200)
        .json({
          message: `Product was successfully deleted`,
        })
        .end(del);
    })
    .catch((err) => {
      res.status(500).json({ err, message: "error, unable to delete product" });
    });
});

module.exports = router;
