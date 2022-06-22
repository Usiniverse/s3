import aws from 'aws-sdk';
import env from "dotenv";

env.config();

const {AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env;

export const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion:'v4',
})