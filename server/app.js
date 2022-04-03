import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const DB = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.8d21m.mongodb.net/mern-auth-app?retryWrites=true&w=majority`;

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected successfully !");
  })
  .catch((err) => console.log("MongoDB not connected !!!!!!"));

app.get("/", (req, res) => {
  res.send("Hello connected to the server !!!");
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
