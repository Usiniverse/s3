import aws from 'aws-sdk';
// import {Credentials} from 'aws-sdk';
import env from "dotenv";

env.config();

const {AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env;

// const access = new Credentials({
//
// });

export const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion:'v4',
})

export function getSignedUrl({key}) {
    return new Promise((resolve, reject)=>{
        s3.createPresignedPost({
            Bucket: "chad-image-upload",
            Fields: {key},
            Expires: 10 * 60 * 60,
            Conditions: [
                ["content-length-range", 0, 50 * 1024 * 1024],
                ["starts-with", "$Content-Type", "image/"]
            ]
        }, (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}