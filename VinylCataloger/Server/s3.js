import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const bucketname = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKeyId = process.env.AWS_SECRET_KEY;
export const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretKeyId,
});

export function uploadFile(file) {
  console.log(file);

  const uploadParams = {
    Bucket: bucketname,
    Body: file.buffer,
    Key: file.originalname,
  };
  return s3.upload(uploadParams).promise();
}

export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketname,
  };

  s3.getSignedUrl("getObject", downloadParams, (err, data) => {
    if (err) {
      console.error("Error fetching image:", err);
      return;
    } else {
      console.log(data.Body);
      return data.Body;
    }
  });
}
