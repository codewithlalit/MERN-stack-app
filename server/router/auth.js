import express from "express";
//Call User Schema
import User from "../model/userSchema.js";

//Use router from express
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
  res.send("Hello !! You are connected to server with router.");
});

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  if (!name || !email || !password || !cPassword) {
    return res.status(422).json({ error: "Field cannot be empty !" });
  }
  if (password !== cPassword) {
    return res.status(422).json({ error: "Password doesn't match !!!" });
  }

  try {
    const isEmailUsed = await User.findOne({ email: email });

    if (isEmailUsed) {
      return res.status(422).json({ error: "Email already used !!!!" });
    }

    const user = new User({ name, email, password, cPassword });

    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch {
    console.log(err);
  }
});

//Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email: email });

    if (!checkEmail) {
      return res.status(400).json({ error: "Email not found !" });
    }
    if (password === checkEmail.password) {
      return res.status(200).json({ message: "User logged in successfully !" });
    } else {
      return res
        .status(400)
        .json({ error: "Password Incorrect !! Please try again !!" });
    }
  } catch {
    console.log(error);
  }
});
export default router;
