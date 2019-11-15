module.exports = (req, res) => {
  //const errorList = req.flash("registrationErrors");
  //console.log(errorList);
  res.render("register", {
    errors: req.flash("registrationErrors")
  });
};
