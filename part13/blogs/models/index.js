const Blog = require("./blog");
const BlogUser = require("./user");

Blog.sync();
BlogUser.sync();

module.exports = {
  Blog,
  BlogUser,
};
