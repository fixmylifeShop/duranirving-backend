const cors = require("cors");
const fileupload = require("express-fileupload");
const express = require("express");
const helmet = require("helmet");
const server = express();
// const session = require("../session");
// const cookieParser = require("cookie-parser");

// let whitelist = process.env.WHITELIST_CORS;

// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//       console.log("pass");
//     // }
//     // if (!origin) {
//     //   callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//       // console.log(origin)
//     }
//   },
//   credentials: true,
// };
// server.use(cors(corsOptions));
// server.use(cookieParser());
// server.use(session);

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(fileupload({ useTempFiles: true }));

// const passportRouter = require("../router/auth/passportRouter")
const authRouter = require("../router/auth/authRouter");
const mailerRouter = require("../router/mailer/mailerRouter");
const usersRouter = require("../router/users/usersRouter");
const shopsRouter = require("../router/store/shops/shopsRouter");
const shopviewsRouter = require("../router/store/shopViews/shopViewsRouter");
const cartRouter = require("../router/store/cart/cartRouter");
const ordersRouter = require("../router/store/orders/ordersRouter")
server.use("/api/", authRouter);
// server.use("/api/auth/", passportRouter);
server.use("/api/mailer", mailerRouter);
server.use("/api/users", usersRouter);
server.use("/api/shops", shopsRouter);
server.use("/api/views", shopviewsRouter);
server.use("/api/cart", cartRouter);
server.use("/api/orders", ordersRouter);



server.get("/", (req, res) => {
  res.status(200).json({ api: "DuranIrving api running" });
});

module.exports = server;
