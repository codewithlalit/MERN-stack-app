import express from "express";
import "dotenv/config";
//Database connection
import "./db/connection.js";
//Routes imported
import auth from "./router/auth.js";

const app = express();

//Use express.json instead of body-parser
app.use(express.json());

//Use Routes
app.use(auth);

const PORT = process.env.SERVER_PORT;

//Set-up port
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
