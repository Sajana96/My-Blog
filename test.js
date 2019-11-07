const mongoose = require("mongoose");

const Post = require("./database/models/Post");

mongoose.connect("mongodb://localhost/testdb");

Post.findByIdAndDelete("5d6bd1d926f8a3385cc12907", {}, (error, post) => {
  console.log(error, post);
});
