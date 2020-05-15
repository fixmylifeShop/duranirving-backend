const router = require("express").Router();
const Images = require("./productImagesModel");

const {
  uploadImageToStorage,
  multer,
} = require("../../../components/googleCloudUploader.js");

router.get("/all", (req, res) => {
  Images.getAllImages()
    .then((image) => {
      res.status(200).json(image);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all images" });
    });
});

// make middleware to check if exist
router.get("/:id", (req, res) => {
  Images.findById(req.params.id)
    .then((image) => {
        if (image) {
           res.status(200).json(image);  
        }
         else {
            res
            .status(400)
            .json({message: "image does not exist" });
        }  
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the image" });
    });
});

// check user owns store or admin
router.post("/", multer.single("file"), (req, res) => {
  let file = req.file;
  const image = req.body;
  // console.log(file);
  const send = (input) => {
    Images.add(input)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  Images.getProductImages(image.product_id)
    .then((count) => {
      if (count.length < 5) {
        if (file) {
          uploadImageToStorage(file)
            .then((img) => {
              image.image = img;
              send(image);
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        } else {
          send(image);
        }
      } else {
        res
          .status(400)
          .json({
            image_count: count.length,
            message: "Limit of photos reached",
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "error added your image to this product" });
    });
});

// make middleware to check if exist
// check user owns photo or admin
router.delete("/:id" , (req, res) => {
    Images.remove(req.params.id)
    .then((del) => {
        res
          .status(200)
          .json({
            message: `Image was successfully deleted`,
          })
          .end(del);
      })
      .catch((err) => {
        res.status(500).json({ err, message: "error, unable to delete image" });
      });
})

module.exports = router;
