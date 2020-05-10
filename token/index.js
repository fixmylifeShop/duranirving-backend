const secret = require("../router/auth/middleware/secrets");
const jwt = require("jsonwebtoken");

var now = new Date();
var hoursleft = 23 - now.getHours();
var minutesleft = 59 - now.getMinutes();
var secondsleft = 59 - now.getSeconds();
//format 0 prefixes
if (minutesleft < 10) minutesleft = "0" + minutesleft;
if (secondsleft < 10) secondsleft = "0" + secondsleft;
var sechours = hoursleft * 3600;
var secminutes = hoursleft * 60;
let timeuntil = sechours + secminutes + secondsleft;

function Usertoken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    // roles: ["user"]
  };

  const options = {
    // expiresIn: "24h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

function viewToken() {
  const payload = {
    visited: true,
  };

  const options = {
    expiresIn: timeuntil,
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

function cartToken(cart) {
  const payload = {
    cart: cart,
  };

  const options = {
    // expiresIn: "24h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = { Usertoken, viewToken, cartToken };
