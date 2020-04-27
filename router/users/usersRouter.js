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
      Posts.getUserPosts(req.decodedToken.id)
        .where({ user_id: req.decodedToken.id })
        .then((posts) => {
          if (!posts) {
            user.posts = [];
            return res.status(200).json(user);
          } else {
            user.posts = posts;
            return res.status(200).json(user);
          }
        })
        .catch((err) => {
          res.status(200).json(user);
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ err, message: "we ran into an error retreving the user" });
    });
});

router.get("/:id", verifyUserExist, (req, res) => {
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

module.exports = router;
