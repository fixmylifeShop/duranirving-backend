const jwt = require("jsonwebtoken");
const secrets = require("./secrets");

module.exports = (req, res, next) => {
      const token = req.headers.authorization

      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
          if (err) {
              res.status(401).json({err, message: "Please Login"});
          } else {
              req.decodedToken = decodedToken;
              next()
          }
      })
};

// //session middleware
// module.exports = (req, res, next) => {
//   if (req.session && req.session.user) {
//     req.user = req.session.user
//     next();
//   } else {
//     res.status(401).json("Please Login");
//   }
// };
