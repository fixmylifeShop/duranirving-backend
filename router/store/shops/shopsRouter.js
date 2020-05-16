const router = require("express").Router();
const Shops = require("./shopsModel");
const Products = require("../products/productsModel");
const Views = require("../shopViews/shopViewsModel");
const restricted = require("../../auth/middleware/restrictedMiddleware");
const upload = require("../../../components/cloudinaryUploader");

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
        Views.getShopViewsCount(shop.id).then((views) => {
          shop.views = views;
          res.status(200).json(shop);
        });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the shop" });
    });
});
// router.get("/user/:id", (req, res) => {
//   Shops.getUserShops(req.params.id)
//     .then(async (shop) => {
//       const newShop = await shop.map(async (store) => {

//         store.views = await Views.getShopViewsCount(store.id)
//         return store;
//       });
//       res.status(200).json(await Promise.all(newShop));
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ err, message: "we ran into an error retreving the shop" });
//     });
// });

router.get("/user/:id", (req, res) => {
  Shops.getUserShops(req.params.id)
    .then((shop) => {
      shop.map((store) => {
        // store.views = [];
        Views.getShopViewsCount(store.id).then((res) => {
          return (store.views = res);
        });
        return store;
      });
      return res.status(200).json(shop);
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

router.post("/", restricted, (req, res) => {
  const shop = req.body;
  shop.user_id = req.decodedToken.id;

  const send = (shop) => {
    Shops.add(shop)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((error) => {
        res.status(500).json({
          error,
          message: "we ran into an error creating your store",
        });
      });
  };
  if (req.files) {
    let file = req.files.file;
    upload(file.tempFilePath, (error, result) => {
      if (result && result.url) {
        shop.store_logo = result.url;
        send(shop);
      } else {
        res.status(500).json(error);
      }
    });
  } else {
    send(shop);
  }
});

router.put(
  "/:id",
  restricted,
  // verifyPostOwner,
  (req, res) => {
    // let file = req.file;
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
    if (req.files) {
      let file = req.files.file;
      upload(file.tempFilePath, (error, result) => {
        if (result && result.url) {
          shop.store_logo = result.url;
          sendUpdate(shop);
        } else {
          res.status(500).json(error);
        }
      });
    } else {
      shop.store_logo =
        "https://fulltummyfund.co.za/wp-content/uploads/2017/01/PlaceholderLogo.png";
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
