const router = require("express").Router();
const { Blog, BlogUser } = require("../models");

router.post("/", async (_req, res) => {
  await Blog.truncate({ cascade: true });
  await BlogUser.truncate({ cascade: true });
  res.status(204).end();
});

module.exports = router;
