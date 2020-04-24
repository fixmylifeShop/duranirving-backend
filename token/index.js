const secret = require("../router/auth/middleware/secrets");
const jwt = require("jsonwebtoken");

function generatetoken(user) {
  const payload = {
    subject: user.id,
    id: user.id,
    email: user.email,
    // roles: ["user"]
  };

  const options = {
    // expiresIn: "24h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = generatetoken;
