const Blog = require("./blog");
const BlogUser = require("./user");

BlogUser.hasMany(Blog);
Blog.belongsTo(BlogUser);

module.exports = {
  Blog,
  BlogUser,
};
