import express from "express";
import "dotenv/config";
import "./db/connection.js";

import auth from "./router/auth.js";
const app = express();

app.use(express.json());
app.use(auth);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
