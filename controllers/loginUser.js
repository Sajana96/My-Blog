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
          req.session.username = user.username;
          res.redirect("/");
        } else {
          const enable = "block";
          const errMsgLogin = "Error Username or Password";
          const loginData = req.body;
          req.flash("enable", enable);
          req.flash("errMsgLogin", errMsgLogin);
          req.flash("loginData", loginData);
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
