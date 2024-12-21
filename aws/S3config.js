const aws = require("aws-sdk");

const S3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

module.exports = S3;
