const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "signup",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "signin",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "create",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "edit",
  });
});

adminRouter.delete("/course", function (req, res) {
  res.json({
    message: "remove",
  });
});

adminRouter.delete("/course/bulk", function (req, res) {
  res.json({
    message: "get all created",
  });
});

module.exports = {
  adminRouter,
};
