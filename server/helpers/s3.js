const S3 = require("aws-sdk/clients/s3");
const fs = require("fs-extra");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
// console.log("Bucket name in terminal: ", process.env.AWS_BUCKET_NAME);
const s3Client = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
// Uploads a file to s3
module.exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParms = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3Client.upload(uploadParms).promise();
};

// Downloads a file from s3
