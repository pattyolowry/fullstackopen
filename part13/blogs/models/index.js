const Blog = require("./blog");
const BlogUser = require("./user");
const ReadingList = require("./reading_list");
const Session = require("./session");

BlogUser.hasMany(Blog);
Blog.belongsTo(BlogUser);

BlogUser.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(BlogUser, { through: ReadingList, as: "blog_users_marked" });

BlogUser.hasMany(ReadingList);
ReadingList.belongsTo(BlogUser);

Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

BlogUser.hasOne(Session);
Session.belongsTo(BlogUser);

module.exports = {
  Blog,
  BlogUser,
  ReadingList,
  Session,
};
