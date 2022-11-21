import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParms = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    contentType: mimetype,
  };
  return s3Client.send(new PutObjectCommand(uploadParms));
}

// Downloads a file from AWS s3
export async function getObjectSignedUrl(key) {
  const params = {
    Key: key,
    Bucket: bucketName,
  };

  const command = new GetObjectCommand(params);
  const seconds = 86400; //1 día en segundos
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  return url;
}

// Delete an object (file) from AWS s3
export async function deleteObject(key) {
  const params = {
    Key: key,
    Bucket: bucketName,
  };

  await s3Client.send(new DeleteObjectCommand(params));
}
