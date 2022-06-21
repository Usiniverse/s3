import upload from "../middleware/imageUpload.js";
import {Router} from 'express';
import fs from "fs";
import {promisify} from "util";
import mongoose from "mongoose";
import {s3} from '../aws.js';
import {v4 as uuid} from "uuid";
import mime from "mime-types";
import Post from "../model/post.js";
const router = Router();


router.post('/accommodations', upload.array("images", 5), async (req, res) => {
    try {
        const {
            title, house_name, fee, content, address,
            people, wifi, parking, room, category,
        } = req.body;

        console.log(req.files.length);

        req.files.map((file) => {
            console.log(file.filename);
        });

        const postDocs = await new Post({
            people : parseInt(people),
            room : parseInt(room),

            wifi : wifi === "true" ? true : false,
            parking : parking === "true" ? true : false,

            images : req.files.map((file) => {
                return file.location;
            }),

            nickname : "세화",

            fee, title, house_name, content, address, category
        }).save();

        res.json(postDocs);
    } catch (e) {
        console.log(e)
        res.status(400).json({message: e.message})
    }
})

router.get('/accommodations', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})

router.get('/accommodations', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})

router.get('/accommodations/:category', async (req, res) => {
    try {
        const {category} = params;

        const posts = await Post.find({category})

        if (!posts) throw new Error("카테고리가 잘못 됐습니다.")

        res.json(posts);

    } catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})

router.get("/me", async (req, res) => {
    try {
        const {lastid} = req.query;
        if (lastid && !mongoose.isValidObjectId(lastid))
            throw new Error("invalid lastid")

        const {user, headers} = req;
        if (!user) throw new Error("권한이 없습니다.");

        const images = await Image
            .find(lastid ?
                {"user._id": user.id, _id: {$lt: lastid}} :
                {"user._id": user.id})
            .sort({_id: -1})
            .limit(8);
        res.json(images)
    } catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})

router.get('/:imageId', async (req, res) => {
    try {
        const {user, params} = req;
        const {imageId} = params;

        if (!mongoose.isValidObjectId(imageId)) throw new Error("올바르지 않은 이미지 아이디입니다.")

        const image = await Image.findOne({_id: imageId})

        if (!image) throw new Error("요청하신 이미지가 없습니다.")
        if (!image.public && (!user || user.id !== image.user.id)) throw new Error("권한이 없습니다.");

        res.json(image);

    } catch (e) {
        console.log(e);
        res.status(400).json({message: e.message});
    }
})

export default router;