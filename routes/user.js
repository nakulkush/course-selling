const express = require("express");
const Router = express.Router;
const userRouter = Router();
const { signUpValidation, signInValidation } = require("./zod");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "IamAuser0000";

userRouter.use(express.json());
userRouter.post("/signup", async function (req, res) {
  try {
    // added zod validation from the zod file
    const validatedDetails = signUpValidation.parse(req.body);
    const { email, password, firstName, lastName } = validatedDetails;

    //hashed password for security using bcrypt
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.json({
      message: "Sign Up done",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation Error",
        errors: e.errors,
      });
    } else {
      return res.status(500).json({
        message: `Sign Up Failed ${e}`,
      });
    }
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const validatedData = signInValidation.parse(req.body);
    const { email, password } = validatedData;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Email or Password" });
    }

    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_USER_PASSWORD
      );

      res.json({
        token,
      });
    }
  } catch (e) {
    res.json({
      message: e.errors,
    });
  }
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "purchases",
  });
});

module.exports = {
  userRouter,
};
