import express from 'express';
import mongoose from "mongoose";
import env from "dotenv"
import postRouter from "./routes/postRouter.js";

env.config();

// express app
const app = express();
const {DB_HOST, PORT} = process.env;

// db conenction
mongoose.connect(DB_HOST)
    .then(() => {
      console.log("MongoDB Connected")

      app.use('/uploads', express.static("uploads"))
      app.use(express.json())

      app.use('/api', postRouter)

      app.listen(PORT, () => {
        console.log('Server Started...    at Port : ' + PORT)
      })
    })
    .catch(console.log)