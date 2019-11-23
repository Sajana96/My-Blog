const Post = require("../database/models/Post");
const path = require("path");
const cloudinary = require("cloudinary");

module.exports = (req, res) => {
  console.log("came to stor post contrller");
  const { image } = req.files;
  console.log(image);
  const uploadPath = path.resolve(__dirname, "..", "public/posts", image.name);
  const { username, title, description, content } = req.body;
  image.mv(uploadPath, error => {
    cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
      if (error) {
        res.redirect("/");
      }
      Post.create(
        {
          ...req.body,
          image: result.secure_url,
          author: req.session.userID
        },
        (error, post) => {
          console.log(error);
          console.log(post);
          res.redirect("/");
        }
      );
    });

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
