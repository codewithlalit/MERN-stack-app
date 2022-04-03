import mongoose from "mongoose";
import "dotenv/config";

const DB = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8d21m.mongodb.net/mern-auth-app?retryWrites=true&w=majority`;

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected successfully !");
  })
  .catch((err) => console.log(err));
