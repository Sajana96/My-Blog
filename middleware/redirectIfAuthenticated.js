const User = require("../database/models/User");

module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect("/");
  }

  next();
};
