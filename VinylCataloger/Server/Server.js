import express from "express";
import mysql from "mysql2";
import multer from "multer";
import path, { resolve } from "path";
import cors from "cors";
import { createRequire } from "module";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import getSignedUrlPromise from "@aws-sdk/s3-request-presigner";
const bucketname = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKeyId = process.env.AWS_SECRET_KEY;
import S3 from "aws-sdk/clients/s3.js";
import userRoutes from "./routes/user.js";
import artistRoutes from "./routes/artist.js";
import authRoutes from "./routes/auth.js";
import imagesRoutes from "./routes/images.js";
import vinylRoutes from "./routes/vinyls.js";
import { db } from "./dbConnection.js";
import cookieParser from "cookie-parser";
import { getFileStream, uploadFile } from "./s3.js";

const s3 = new S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretKeyId,
});
const port = 8080;
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile("/Client/vinyl_cataloger/public/index.html", { root: "../" });
});

app.get("/images:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  console.log(readStream);

  res.send(readStream);
});
app.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  res.send({ imagepath: `${result.Key}` });
});

app.get("/posts", (req, res) => {
  console.log("HI");
  const params = {
    Bucket: "vinylcatalogbucket",
    Key: req.query.key,
  };
  var promise = s3.getSignedUrlPromise("getObject", params);
  promise.then(
    function (url) {
      res.send(url);
    },
    function (err) {
      console.log(err);
    }
  );
});

app.get("/album", (req, res, next) => {
  s3.listObjects({ Bucket: bucketname })
    .promise()
    .then((data) => {
      console.log(data);
      const baseUrl = `https://s3.amazon.aws.com/${bucketname}/`;
      let urlArr = data.Contents.map((e) => baseUrl + e.Key);
      console.log(urlArr);
    })
    .catch((err) => console.log(err));
});
app.get("/retreive", (req, res) => {
  const params = {
    Bucket: "vinylcatalogbucket",
    Key: req.query.Key,
  };
  console.log(params);
  var promise = s3.getSignedUrlPromise("getObject", params);
  promise.then(
    function (url) {
      res.send(url);
    },
    function (err) {
      console.log(err);
    }
  );
});
app.use("/api/users", userRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/vinyls", vinylRoutes);

app.listen(port, () => {
  console.log("running");
});
