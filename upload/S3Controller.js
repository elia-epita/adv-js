const S3 = require("../aws/S3config");
const logger = require("../middleware/winston");

const S3Upload = (path, file, callback) => {
  if (file) {
    let params = {
      Bucket: "images-testing-temp",
      Key: `${path}${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    S3.upload(params, function (err, data) {
      if (err) {
        console.log(err)
        logger.error(err.message);
        return callback({
          Location: null,
        });
      } else {
        console.log("DATA FROM AWS: " , data);
        return callback({
          Location: data.Location,
        });
      }
    });
  } else {
    return callback({
      Location: null,
    });
  }
};

module.exports = { S3Upload };
