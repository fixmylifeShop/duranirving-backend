const { Storage } = require("@google-cloud/storage");
const path = require("path");
const Multer = require("multer");

const gc = new Storage({
  keyFilename: path.join(__dirname, "../google-creds.json"),
  projectId: "my-portfolio-248005",
});
const bucket = gc.bucket("duranirving-cloud");
// gc.getBuckets().then((x) => console.log(x));

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    }
    let newFileName = `${file.originalname}_${Date.now()}`;
    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
    blobStream.on("finish", () => {
      const url = `https://storage.cloud.google.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
      return url;
    });
    blobStream.on("error", (error) => {
      console.log(error);
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadImageToStorage, multer };
