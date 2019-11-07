const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");
const fileUpload = require("express-fileupload");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const contactUsPageController = require("./controllers/contactPage");
const aboutUsPageController = require("./controllers/aboutUsPage");
const getPostPageController = require("./controllers/getPost");
const registerUserController = require("./controllers/registerUser");
const storePostController = require("./controllers/storePost");
const storeUserController = require("./controllers/storeUser");
const loginUserController = require("./controllers/loginUser");

const storePostMiddleware = require("./middleware/storePost");

const app = new express();

mongoose.connect("mongodb://localhost/node-app-db", { useNewUrlParser: true });

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);

app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageController);

app.get("/about", aboutUsPageController);

app.get("/post/:id", getPostPageController);

app.get("/contact", contactUsPageController);

app.get("/posts/new", createPostController);

app.get("/auth/register", registerUserController);

app.use("/posts/store/", storePostMiddleware);
app.post("/posts/store", storePostController);

app.post("/users/register", storeUserController);

app.post("/auth/users/login", loginUserController);
app.post("/users/login", loginUserController);

app.listen(4000, () => {
  console.log("app listens to port 4000");
});
