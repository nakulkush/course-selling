const express = require("express");
const Router = express.Router;
const userRouter = Router();
const { signUpValidation } = require("./zod");
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");

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

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signin",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "purchases",
  });
});

module.exports = {
  userRouter,
};
