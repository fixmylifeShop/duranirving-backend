require("dotenv").config();
const server = require("./api/server.js");
var fs = require("fs");
const port = process.env.PORT || 4000;

setInterval(() => {
  var P = "./tmp";
  fs.exists(P, (e) => {
    if (e) {
      fs.readdirSync(P).forEach((f) => {
        fs.unlinkSync(P + "/" + f);
      });
      fs.rmdirSync(P);
    }
  });
}, 86400000);

server.listen(port, () => {
  console.log(`\n Server Live On ${port}\n`);
});
