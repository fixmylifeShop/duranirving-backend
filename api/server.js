const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const server = express();
const createCredsJsonFile = require('../components/createCreds')
server.use(helmet());
server.use(cors());
server.use(express.json());

createCredsJsonFile()

const authRouter = require("../router/auth/authRouter");
const mailerRouter = require("../router/mailer/mailerRouter");
const usersRouter = require("../router/users/usersRouter");
const shopsRouter = require("../router/store/shops/shopsRouter");
const shopviewsRouter = require("../router/store/shopViews/shopViewsRouter");
server.use("/api/", authRouter);
server.use("/api/mailer", mailerRouter);
server.use("/api/users", usersRouter);
server.use("/api/shops", shopsRouter);
server.use("/api/views", shopviewsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "DuranIrving api running" });
});

module.exports = server;
