const router = require("express").Router();
const { ReadingList, BlogUser, Blog } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

const rlToJson = (readinglist) => {
  return {
    id: readinglist.id,
    blog_id: readinglist.blogId,
    user_id: readinglist.blogUserId,
    read: readinglist.read,
  };
};

router.post("/", async (req, res, next) => {
  try {
    if (!(req.body.blogId && req.body.userId)) {
      return res.status(400).json({ error: "userId or blogId missing" });
    }

    const existingUser = await BlogUser.findByPk(req.body.userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const existingBlog = await Blog.findByPk(req.body.blogId);
    if (!existingBlog) {
      return res.status(404).json({ error: "Blog does not exist" });
    }

    const existingEntry = await ReadingList.findOne({
      where: {
        blogId: req.body.blogId,
        blogUserId: req.body.userId,
      },
    });

    if (existingEntry) {
      return res.status(400).json({ error: "List entry already exists" });
    }

    const readingList = await ReadingList.create({
      blogId: req.body.blogId,
      blogUserId: req.body.userId,
    });
    return res.json(rlToJson(readingList));
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id);

    if (!readingList) {
      return res.status(404).end();
    }

    if (readingList.blogUserId === req.user.id) {
      readingList.read = req.body.read;
      await readingList.save();
      res.json(rlToJson(readingList));
    } else {
      res.status(401).json({ error: "User does not have access to this list" });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
