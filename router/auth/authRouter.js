const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Auth = require("./authModel");
const generate = require("../../token");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Auth.add(user)
    .then((saved) => {
      const { email } = saved;
      Auth.findBy({ email })
        .then((user) => {
          const token = generate.Usertoken(user);

          res.status(200).json({
            message: `welcome ${user.first_name}!`,
            token,
          });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error, message: "Unable to add" });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Auth.findBy({ email })
    .first()
    .then((user) => {
      console.log("hello");
      const token = generate.Usertoken(user);
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

// // session register
// router.post("/register", (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 10);
//   user.password = hash;

//   Auth.add(user)
//     .then((saved) => {
//       const { email } = saved;
//       Auth.findBy({ email })
//         .then((user) => {
//           req.session.user = user;
//           res.status(200).json({
//             message: `welcome ${user.first_name}!`,
//           });
//         })
//         .catch((error) => {
//           res.status(500).json(error);
//         });
//     })
//     .catch((error) => {
//       res.status(500).json({ error, message: "Unable to add" });
//     });
// });

// // session login
// router.post("/login", (req, res) => {
//   let { email, password } = req.body;
//   Auth.findBy({ email })
//     .then((user) => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         let {id, email,} = user
//         req.session.user = {id, email,}
//         res.status(200).json({
//           message: `welcome back ${user.first_name}!`,
//         });
//       } else {
//         res.status(401).json({ message: "Invalid Credentails" });
//       }
//     })
//     .catch((error) => {
//       res.status(401).json({ error, message: "error user might not exist" });
//     });
// });

// session logout
// router.delete("/logout", (req, res) => {
//   if (req.session.user) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.json({ message: "unable to log you out" });
//       } else {
//         res.status(200).json({ message: "Logout successful" });
//       }
//     });
//   } else {
//     res.status(200).json({ message: "No user logged in" });
//   }
// });

module.exports = router;
