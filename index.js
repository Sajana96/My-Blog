const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const edge = require("edge.js");
const cloudinary = require("cloudinary");
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
const logoutUserController = require("./controllers/logoutController");

const authMiddleware = require("./middleware/auth");
const storePostMiddleware = require("./middleware/storePost");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticated");

const app = new express();
//mongoose.connect("mongodb://localhost/node-app-db", { useNewUrlParser: true });
mongoose.connect(
  "mongodb+srv://sajana96:saj2632210@myblog-sdcem.mongodb.net/blog-db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(connectFlash());

cloudinary.config({
  api_key: "561731371536788",
  api_secret: "ZLmfYG6fMRaFCtpFhoq0pwqbRyQ",
  cloud_name: "sajana96"
});

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

app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userID);
  next();
}); // this is to initialize an auth variable with session ID to customize the template enging if(auth){}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
  edge.global("username", req.session.username);
  next();
}); //this is used when you want to send a gllobal variable called username available in all the routes

app.get("/", homePageController);

app.get("/about", aboutUsPageController);

app.get("/post/:id", getPostPageController);

app.get("/contact", contactUsPageController);

app.get("/posts/new", authMiddleware, createPostController);

app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleware,
  registerUserController
);

app.post(
  "/posts/store",
  authMiddleware,
  storePostMiddleware,
  storePostController
);

app.post("/users/register", storeUserController);

app.post(
  "/posts/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.post(
  "/auth/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.get("/auth/logout", authMiddleware, logoutUserController);

app.use((req, res) => res.render("not-found"));

app.listen(4000, () => {
  console.log("app listens to port 4000");
});
