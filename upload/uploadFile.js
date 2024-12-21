const { S3Upload } = require("./S3Controller");
const pool = require("../boot/database/db_connect");
const logger = require("../middleware/winston");

const uploadFile = (path, req, sql, callback) => {
  S3Upload(path, req.file, function (s3Upload) {
    if (s3Upload.Location) {
      pool.query(sql, [s3Upload.Location, req.params.id], (err, rows) => {
        if (err) {
          logger.error(err.stack);
          callback({
            error: err,
          });
        } else {
          return callback({
            message: "file uploaded",
            url: s3Upload.Location,
          });
        }
      });
    } else {
      return callback({
        error: "Upload failed",
      });
    }
  });
};

module.exports = uploadFile;
