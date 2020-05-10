const router = require("express").Router();

const Users = require("./usersModel");
const restricted = require("../auth/middleware/restrictedMiddleware");

router.get("/all", (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json(users);
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

router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      return res.status(200).json(user);
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

router.delete("/:id", restricted, (req, res) => {
  const user = req.decodedToken;
  if (user.id == req.params.id) {
    Users.remove(req.params.id)
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
  } else {
    res.status(400).json({
      message: "you are not able to delete another users account",
    });
  }
});

router.delete("/", restricted, (req, res) => {
  const user = req.session.user;
  Users.remove(user.id)
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
