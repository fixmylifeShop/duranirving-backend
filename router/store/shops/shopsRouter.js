const router = require("express").Router();
const Shops = require("./shopsModel");
const Products = require("../products/productsModel");
const Views = require("../shopViews/shopViewsModel");
const restricted = require("../../auth/middleware/restrictedMiddleware");

const {
  uploadImageToStorage,
  multer,
} = require("../../../components/googleCloudUploader.js");

// router.post("/upload", multer.single("file"), (req, res) => {
//   let file = req.file;
//   if (file) {
//     uploadImageToStorage(file)
//       .then((success) => {
//         return res.status(200).json(success);
//       })
//       .catch((error) => {
//         console.error(error);
//         return res.status(500).json(error);
//       });
//   }
// });

router.get("/", (req, res) => {
  Shops.getAllShops()
    .then(async (shop) => {
      const newShop = await shop.map(async (store) => {
        store.products = await Products.getShopProducts(store.id);
        return store;
      });
      res.status(200).json(await Promise.all(newShop));
    })
    .catch((error) => {
      res
        .status(500)
        .json({ req, error, message: "error retrieving all shops" });
    });
});

router.get("/:id", (req, res) => {
  Shops.findById(req.params.id)
    .then((shop) => {
      Products.getShopProducts(shop.id).then((products) => {
        shop.products = products;
        Views.getShopViewsCount(shop.id).then();
        res.status(200).json(shop);
      });

      // res.status(200).json(await Promise.all(shop));
    })

    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the shop" });
    });
});
router.get("/user/:id", (req, res) => {
  Shops.getUserShops(req.params.id)
    .then(async (shop) => {
      const newShop = await shop.map(async (store) => {
        // store.products = await Products.getShopProducts(store.id);
        let {
          view_years,
          total_views,
          view_data,
        } = await Views.getShopViewsCount(store.id);
        store.views = { total_views, view_years, view_data };
        return store;
      });
      function PromiseTimeout(delayms) {
        return new Promise(function (resolve, reject) {
          setTimeout(resolve, delayms);
        });
      }
      await PromiseTimeout(20000);
      res.status(200).json(await Promise.all(newShop));
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the shop" });
    });
});

router.get("/logged/user", restricted, (req, res) => {
  Shops.getUserShops(req.decodedToken.id)
    .then(async (shop) => {
      const newShop = await shop.map(async (store) => {
        store.products = await Products.getShopProducts(store.id);
        let {
          view_years,
          total_views,
          view_data,
        } = await Views.getShopViewsCount(store.id);
        store.views = { total_views, view_years, view_data };
        return store;
      });
      res.status(200).json(await Promise.all(newShop));
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the shop" });
    });
});

router.post("/", restricted, multer.single("file"), async (req, res) => {
  let file = req.file;
  const shop = req.body;
  shop.user_id = req.decodedToken.id;
  const send = async (shop) => {
    try {
      const inserted = await Shops.add(shop);
      res.status(201).json(inserted);
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "we ran into an error creating your store" });
    }
  };

  if (file) {
    uploadImageToStorage(file)
      .then((success) => {
        shop.store_logo = success;
        send(shop);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } else {
    shop.store_logo =
      "https://fulltummyfund.co.za/wp-content/uploads/2017/01/PlaceholderLogo.png";
    send(shop);
  }
});

router.put(
  "/:id",
  multer.single("file"),
  // restricted, verifyPostOwner,
  (req, res) => {
    let file = req.file;
    const shop = req.body;
    const sendUpdate = () => {
      return Shops.update(req.params.id, req.body)
        .then((update) => {
          res.status(201).json(update);
        })
        .catch((err) => {
          res.status(500).json({ err, message: "error updating your post" });
        });
    };
    if (file) {
      uploadImageToStorage(file)
        .then((success) => {
          shop.store_logo = success;
          sendUpdate(shop);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    } else {
      sendUpdate(shop);
    }
  }
);

router.delete(
  "/:id",
  // restricted,
  // verifyPostOwner,
  (req, res) => {
    Shops.remove(req.params.id)
      .then((del) => {
        res
          .status(200)
          .json({ message: "the shop has successfully been deleted" })
          .end(del);
      })
      .catch((err) => {
        res.status(500).json({ err, message: "this shop does not exist" });
      });
  }
);

const ProductsRouter = require("../products/productsRouter");

router.use("/products", ProductsRouter);

const ProductImagesRouter = require("../productImages/productImagesRouter");

router.use("/images", ProductImagesRouter);

module.exports = router;
