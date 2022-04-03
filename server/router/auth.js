import express from "express";
import User from "../model/userSchema.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from router");
});
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
export default router;
