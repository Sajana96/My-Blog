module.exports = (req, res) => {
  if (req.session.userID) {
    return res.render("newPost");
  }
  res.redirect("/");
};
