const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  const posts = await Post.find({});
  //console.log(posts);
  //console.log(req.flash("enable")[0]);
  res.render("index", {
    posts,
    enable: req.flash("enable")[0],
    errMsgLogin: req.flash("errMsgLogin")[0]
  });
};
