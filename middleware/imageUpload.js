import multer from "multer";
import multerS3 from "multer-s3";
import {v4 as uuid} from "uuid";
import mime from "mime-types";
import { s3 } from '../aws.js'

const storage_s3 = multerS3({
    s3,
    bucket : "chad-image-upload",
    key: (req, file, callback)=> callback(null, `tmp-sh/${uuid()}.${mime.extension(file.mimetype)}`)
});

const storage = storage_s3;

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype))
            callback(null, true)
        else
            callback(new Error('invalid file type.'), false)
    },
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
});

export default upload;