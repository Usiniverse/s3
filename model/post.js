import mongoose from "mongoose";
import icrementFactory from "mongoose-sequence";

const PostSchema = new mongoose.Schema({
        id: {type: Number},
        people: {type: Number, required: true},
        room: {type: Number, required: true},

        nickname: {type: String, required: true},
        title: {type: String, required: true},
        house_name: {type: String, required: true},
        fee: {type: String, required: true},
        content: {type: String, required: true},
        address: {type: String, required: true},
        category: {type: String, required: true},


        wifi: {type: Boolean, required: true},
        parking: {type: Boolean, required: true},
        images: [String]
    },
    {timestamps: true})

 const autoIncrement = icrementFactory(mongoose);
 PostSchema.plugin(autoIncrement, {inc_field : 'id'})

const Post = mongoose.model("post", PostSchema);


export default Post;