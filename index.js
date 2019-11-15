const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./database/models/Post");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const contactUsPageController = require("./controllers/contactPage");
const aboutUsPageController = require("./controllers/aboutUsPage");
const getPostPageController = require("./controllers/getPost");
const registerUserController = require("./controllers/registerUser");
const storePostController = require("./controllers/storePost");
const storeUserController = require("./controllers/storeUser");
const loginUserController = require("./controllers/loginUser");

const authMiddleware = require("./middleware/auth");
const storePostMiddleware = require("./middleware/storePost");

const app = new express();
mongoose.connect("mongodb://localhost/node-app-db", { useNewUrlParser: true });

app.use(connectFlash());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

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

app.get("/posts/new", authMiddleware, createPostController);

app.get("/auth/register", registerUserController);

app.post(
  "/posts/store",
  authMiddleware,
  storePostMiddleware,
  storePostController
);

app.post("/users/register", storeUserController);

app.post("/posts/users/login", loginUserController);
app.post("/auth/users/login", loginUserController);
app.post("/users/login", loginUserController);

app.listen(4000, () => {
  console.log("app listens to port 4000");
});
