const router = require("express").Router();
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // service: "gmail",
  port: 465,
  secure: true,
  auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
});
var m = new Date();
var dateString =
  m.getUTCFullYear() +
  "/" +
  ("0" + (m.getUTCMonth() + 1)).slice(-2) +
  "/" +
  ("0" + m.getUTCDate()).slice(-2) +
  " " +
  ("0" + m.getUTCHours()).slice(-2) +
  ":" +
  ("0" + m.getUTCMinutes()).slice(-2) +
  ":" +
  ("0" + m.getUTCSeconds()).slice(-2);

router.post("/", (req, res) => {
  const { to, url, name, email, phone, message, subject } = req.body;

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      layoutsDir: __dirname + `/views/`,
    },
    viewPath: __dirname + `/views/`,
  };

  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    to,
    subject: subject
      ? name.toUpperCase() + " - " + subject
      : `YOU GOT A NEW MESSAGE: ${url}`,
    template: "main",
    context: {
      url,
      name,
      email,
      phone,
      message,
      time: dateString,
    },
  };
  transporter.sendMail(mailOptions, (err, data) => {
    let pass = process.env.EMAIL;
    if (err) {
      return res
        .status(500)
        .json({ err, message: "error sending your email", pass });
    }
    return res.status(200).json(data);
  });
});

module.exports = router;
