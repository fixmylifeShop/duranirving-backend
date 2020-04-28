const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./authModel");
const generateToken = require("../../token");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Auth.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Unable to add" });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  Auth.findBy({ email })
    .then((user) => {
      const token = generateToken(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `welcome ${user.first_name}!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentails" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error, message: "error user might not exist" });
    });
});

module.exports = router;
