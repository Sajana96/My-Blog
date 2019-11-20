const Post = require("../database/models/Post");
const path = require("path");

module.exports = (req, res) => {
  const { image } = req.files;
  const { username, title, description, content } = req.body;
  image.mv(path.resolve(__dirname, "..", "public/posts", image.name), error => {
    Post.create(
      {
        ...req.body,
        author: req.session.userID,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        console.log(error);
        res.redirect("/");
      }
    );
    /*post = new Post({
      username,
      title,
      description,
      content,
      image: `/posts/${image.name}`
    });
    post.save();*/
  });
};
