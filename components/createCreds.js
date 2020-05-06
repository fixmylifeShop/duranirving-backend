const fs = require("fs");

const createCredsJsonFile = () => {
  new_file = process.env.GOOGLE_CREDS;
  file_path = "./google-creds.json";
  //   newfile = JSON.stringify(newfile);
  if (!fs.existsSync(file_path) && process.env.GOOGLE_CREDS) {
    fs.writeFile(file_path, new_file, (err) => {
      if (!err) {
        console.log("Google credentials file created");
      } else {
        console.log(err);
      }
    });
  }
  if (fs.existsSync(file_path) && !process.env.GOOGLE_CREDS) {
    fs.unlink(file_path, (err) => {
      if (!err) {
        console.log(
          "Please add your google credentials to an \nenvironment variable called GOOGLE_CREDS \nin json format to use google cloud services \nand redeploy once done"
        );
      } else {
        console.log(err);
      }
    });
  }
};
module.exports = createCredsJsonFile;
