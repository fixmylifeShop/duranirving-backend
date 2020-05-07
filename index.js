require("dotenv").config();
const createCredsJsonFile = require("./components/createCreds");
const server = require("./api/server.js")

const port = process.env.PORT || 4000;

createCredsJsonFile();

server.listen(port, () => {
  console.log(`\n Server Live On ${port}\n`);
});
