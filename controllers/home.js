const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const blogPosts = await BlogPost.find({}).populate("userid");
  res.render("index", { blogPosts });
};
