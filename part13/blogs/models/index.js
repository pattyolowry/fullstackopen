const Blog = require("./blog");
const BlogUser = require("./user");
const ReadingList = require("./reading_list");

BlogUser.hasMany(Blog);
Blog.belongsTo(BlogUser);

BlogUser.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(BlogUser, { through: ReadingList, as: "blog_users_marked" });

BlogUser.hasMany(ReadingList);
ReadingList.belongsTo(BlogUser);

Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

module.exports = {
  Blog,
  BlogUser,
  ReadingList,
};
