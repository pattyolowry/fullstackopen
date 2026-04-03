const router = require("express").Router();
const { ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const readingList = await ReadingList.create({
      blogId: req.body.blogId,
      blogUserId: req.body.userId,
    });
    return res.json(readingList);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
