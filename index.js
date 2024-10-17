const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

const app = express();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  mongoose.connect(
    "mongodb+srv://nakul:nakul123@cluster0.12u49.mongodb.net/course-selling"
  );
  console.log("connected");
  app.listen(3000);
}
main();
