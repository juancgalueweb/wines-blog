const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
// Uploads a file to s3
module.exports.uploadFile = (fileBuffer, fileName, mimetype) => {
  const uploadParms = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    contentType: mimetype,
  };
  //TODO: S3.putObject only accepts streams that it can determine the length of
  return s3Client.send(new PutObjectCommand(uploadParms));
};

// Downloads a file from s3
module.exports.getObjectSignedUrl = async (key) => {
  const params = {
    Key: key,
    Bucket: bucketName,
  };

  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  return url;
};
