import upload from "../middleware/imageUpload.js";
import {Router} from 'express';
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

            wifi : wifi === "true",
            parking : parking === "true",

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

export default router;