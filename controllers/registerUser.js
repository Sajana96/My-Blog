module.exports = (req, res) => {
  //const errorList = req.flash("registrationErrors");
  //console.log(errorList);
  res.render("register", {
    errors: req.flash("registrationErrors"),
    userExistError: req.flash("userExistError")[0]
  });
};
