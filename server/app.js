import express from "express";
import "dotenv/config";
import "./db/connection.js";
// import User from "./model/userSchema.js"
const app = express();

const PORT = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.send("Hello connected to the server !!!");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
