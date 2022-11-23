const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ username });
  if (user) {
    const isSame = bcrypt.compare(password, user.password);
    if (isSame) {
      req.session.userId = user._id;
      res.redirect("/");
    } else {
      res.redirect("/auth/login");
    }
  } else {
    res.redirect("/auth/login");
  }
};
