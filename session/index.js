const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

  const sessionConfig = {
    name: "DuranIrving",
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: process.env.PORT ? true : false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("../database/dbConfig"),
      tablename: "Loggedin_users",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 30,
    }),
  };


module.exports = session(sessionConfig);
