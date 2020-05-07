const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const server = express();
const session = require("../session");
const cookieParser = require("cookie-parser");

var whitelist = process.env.WHITELIST_CORS;

var corsOptions = {
  origin: "*",
  // function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  credentials: true,
};

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));
server.use(cookieParser());
server.use(session);

const authRouter = require("../router/auth/authRouter");
const mailerRouter = require("../router/mailer/mailerRouter");
const usersRouter = require("../router/users/usersRouter");
const shopsRouter = require("../router/store/shops/shopsRouter");
const shopviewsRouter = require("../router/store/shopViews/shopViewsRouter");
const cart = require("../router/store/cart/cartRouter");
server.use("/api/", authRouter);
server.use("/api/mailer", mailerRouter);
server.use("/api/users", usersRouter);
server.use("/api/shops", shopsRouter);
server.use("/api/views", shopviewsRouter);
server.use("/api/cart", cart);

server.get("/", (req, res) => {
  res.status(200).json({ api: "DuranIrving api running" });
});

module.exports = server;
