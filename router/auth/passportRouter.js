const router = require("express").Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const InstagramStrategy = require("passport-instagram").Strategy;
const chalk = require("chalk");
const env = process.env;

let user = {};
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
router.use(passport.initialize());
//facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "facebook/callback",
  passport.authenticate("facebook", (req, res) => {
    res.redirect("");
  })
);
//google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
  }
);

router.get("/loggout", (req,res) => {
  console.log("logging out")
  user = {}
  res.redirect("/")
})

module.exports = router;
