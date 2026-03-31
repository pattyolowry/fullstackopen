const router = require("express").Router();

const { Blog, BlogUser } = require("../models");
const { blogFinder, tokenExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
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

router.delete("/:id", blogFinder, async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
});

module.exports = router;
