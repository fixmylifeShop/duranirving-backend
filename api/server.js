const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const mailerRouter = require("../router/mailer/mailerRouter")


server.use("/api/mailer", mailerRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "DuranIrving api running" });
});

module.exports = server;
