const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const posts = await Post.find({}).populate("author");
  //console.log(posts);
  //console.log(req.flash("enable")[0]);
  //console.log(req.flash("loginData")[0]);
  console.log(req.session);
  res.render("index", {
    posts,
    enable: req.flash("enable")[0],
    errMsgLogin: req.flash("errMsgLogin")[0],
    loginData: req.flash("loginData")[0],
    errMsgNoUser: req.flash("errMsgNouser")[0]
  });
};
