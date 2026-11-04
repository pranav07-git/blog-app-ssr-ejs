const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override");

require('dotenv').config();
const Blog = require("./models/blog")

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 8000;
mongoose
.connect(process.env.MONGO_URL)
.then((data) => {
  console.log("MongoDb Connected");
})
.catch((e) => {
  console.log(`mongodb failed to connect ${e}`);
});
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);
  
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/",  async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });   
});


app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
