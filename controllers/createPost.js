module.exports = (req, res) => {
  if (req.session.userID) {
    return res.render("newPost", {
      postError: req.flash("postError")[0]
    });
  }
  res.redirect("/");
};
