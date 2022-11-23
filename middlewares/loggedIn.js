module.exports = (req, res, next) => {
  isLoggedIn = req.session.userId;
  next();
};
