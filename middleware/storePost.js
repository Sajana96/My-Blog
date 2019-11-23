module.exports = (req, res, next) => {
  console.log("came to storePost");
  console.log(req.files);
  //var postError = "";
  if (
    !req.files ||
    !req.body.title ||
    !req.body.description ||
    !req.body.content
  ) {
    const postError = "Cannot Save Post";
    req.flash("postError", postError);
    return res.redirect("/posts/new");
  }
  next();
};
