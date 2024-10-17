const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "preview",
  });
});
courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "buy",
  });
});
module.exports = {
  courseRouter,
};
