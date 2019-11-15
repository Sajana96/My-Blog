const User = require("../database/models/User");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      if (error.errors != null) {
        const registrationErrors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        //console.log(registrationErrors);
        req.flash("registrationErrors", registrationErrors);
        return res.redirect("/auth/register");
      }
      console.log(error);
      const userExistError = "Cannot Register User";
      req.flash("userExistError", userExistError);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};
