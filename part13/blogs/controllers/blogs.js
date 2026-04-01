const router = require("express").Router();
const { Op } = require("sequelize");
const { Blog, BlogUser } = require("../models");
const { blogFinder, tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`,
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["blogUserId"] },
    include: {
      model: BlogUser,
      attributes: ["id", "name"],
    },
    where,
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await BlogUser.findByPk(req.user.id);
    const blog = await Blog.create({ ...req.body, blogUserId: user.id });
    return res.json(blog);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog.blogUserId === req.user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(403).json({ error: "User not authorized to delete blog" });
  }
});

module.exports = router;
