import express from "express";
import bcrypt from "bcryptjs";
//Call User Schema
import User from "../model/userSchema.js";

//Use router from express
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
  res.send(
    "<h1>Hello !! You are connected to server.</h1><h2>Enjoy the APIs from this server.</h2>"
  );
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
  } catch (err) {
    console.log(err);
  }
});

//Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email: email });

    if (!checkEmail) {
      return res
        .status(400)
        .json({ error: "Invalid Credentials !! Please try again !!" });
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        checkEmail.password
      );

      //create token for the object received by checkEmail.
      let token = await checkEmail.generateAuthToken();

      // saving token to the cookie for 5 minutes in milliseconds
      res.cookie("jwtoken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 300000),
      });

      if (isPasswordMatched) {
        return res
          .status(200)
          .json({ message: "User logged in successfully !" });
      } else {
        return res
          .status(400)
          .json({ error: "Invalid Credentials !! Please try again !!" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
export default router;
