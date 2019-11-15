const User = require("../database/models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          console.log("passwords matched");
          req.session.userID = user._id;
          res.redirect("/");
        } else {
          const enable = "block";
          const errMsgLogin = "Error Username or Password";
          req.flash("enable", enable);
          req.flash("errMsgLogin", errMsgLogin);
          console.log("passwords is not correct");
          res.redirect("/");
        }
      });
    } else {
      console.log("No user");
      return res.redirect("/");
    }
  });
};
