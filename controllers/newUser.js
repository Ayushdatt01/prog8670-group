const User = require("../models/User");
const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  try {
    await User.create({
      ...req.body,
    });
    const blogPosts = await BlogPost.find({ username: req.body.username });
    return res.render("index", { blogPosts });
  } catch (err) {
    console.log(err);
    const validationErrors = Object.keys(err.errors).map((key) => {
      return err.errors[key].message;
    });
    req.flash("validationErrors", validationErrors);
    console.log(req.body.username)
    req.flash("data", req.body);
  }

  res.redirect("/auth/register");
};
