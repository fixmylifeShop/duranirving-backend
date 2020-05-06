const router = require("express").Router();

const Views = require("./shopViewsModel");
const restricted = require("../../auth/middleware/restrictedMiddleware");

router.get("/all", (req, res) => {
  Views.getViews()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve users from database." });
    });
});

router.get("/:id", (req, res) => {
  Views.getShopViewsCount(req.params.id)
    .then((shop) => {
      res.status(200).json(shop);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve users from database." });
    });
});

router.get("/", restricted, (req, res) => {
  Users.findById(req.decodedToken.id)
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

// router.get("/:id", (req, res) => {
//   Views.findById(req.params.id)
//     .then((user) => {
//       return res.status(200).json(user);
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ err, message: "we ran into an error retreving the user" });
//     });
// });

router.post("/", (req, res) => {
  Views.add(req.body)
    .then((inserted) => {
      return res.status(201).json(inserted);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Users.update(id, changes)
    .then((update) => {
      res.status(200).json(update);
    })
    .catch((error) => {
      res.status(500).json({
        errorMessage: error,
      });
    });
});

router.delete("/:id", (req, res) => {
    Views.remove(req.params.id)
      .then((del) => {
        res
          .status(200)
          .json({
            message: `View was successfully deleted`,
          })
          .end(del);
      })
      .catch((err) => {
        res.status(500).json({ err, message: "error, unable to delete user" });
      });
});

router.delete("/", restricted, (req, res) => {
  const user = req.decodedToken;
  Views.remove(user.id)
    .then((del) => {
      res
        .status(200)
        .json({
          message: `User:${user.email} was successfully deleted`,
        })
        .end(del);
    })
    .catch((err) => {
      res.status(500).json({ err, message: "error, unable to delete user" });
    });
});

module.exports = router;