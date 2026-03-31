const Blog = require("./blog");
const BlogUser = require("./user");

BlogUser.hasMany(Blog);
Blog.belongsTo(BlogUser);

Blog.sync({ alter: true });
BlogUser.sync({ alter: true });

module.exports = {
  Blog,
  BlogUser,
};
