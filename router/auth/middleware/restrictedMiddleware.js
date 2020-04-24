const jwt = require("jsonwebtoken");
const secrets = require("./secrets");

module.exports = (req, res, next) => {
      const token = req.headers.authorization

      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({err, message: "please log in"});
          } else {
              req.decodedToken = decodedToken;
              next()
          }
      })
  // }
//   const token = req.body.token ? req.body.token : req.headers.authorization;
//   if (token) {
//     jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
//       if (err) {
//         res.status(401).json({ message: "Invalid Credentials" });
//       } else {
//         req.decodedToken = decodedToken;
//         delete req.body.token;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "No token provided!" });
//   }
};
