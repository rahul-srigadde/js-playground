const Minio = require("minio");
require("dotenv").config();

class MinioClient {
  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_URL,
      port: 9000, //process.env.MINIO_PORT,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }
  async isBucketExists(bucket) {
    return await this.minioClient.bucketExists(bucket);
  }

  async createBucket(bucket) {
    const exists = await this.isBucketExists(bucket);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, "us-east-1");
      console.log("Bucket " + bucket + ' created in "us-east-1".');
    } else {
      console.log("Bucket " + bucket + " exists.");
    }
  }
  uploadFile() {
    const file = "/Users/rsrigadd/Downloads/IV downloading.mov";
    const metaData = {
      "Content-Type": "text/html",
      "Content-Language": 123,
      "X-Amz-Meta-Testing": 1234,
      example: 5678,
    };
    const _this = this;
    this.minioClient.fPutObject(
      "srbucket",
      "sr",
      file,
      metaData,
      function (err, objInfo) {
        if (err) {
          return console.log(err);
        }
        console.log("Success", objInfo?.etag, objInfo?.versionId);
        _this.getFile();
      }
    );
  }
  getFile() {
    this.minioClient.fGetObject(
      "srbucket",
      "sr",
      "/Users/rsrigadd/personal/playground/minio/sample.mov",
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("success");
      }
    );
  }
}

const minioClient = new MinioClient();
minioClient.createBucket("srbucket").then();
minioClient.uploadFile();
// minioClient.getFile();
