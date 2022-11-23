const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};
