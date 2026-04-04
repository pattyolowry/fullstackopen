const router = require("express").Router();
const { ReadingList } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id);

    if (!readingList) {
      return res.status(404).end();
    }

    if (readingList.blogUserId === req.user.id) {
      readingList.read = req.body.read;
      await readingList.save();
      res.json(readingList);
    } else {
      res.status(400).json({ error: "User does not have access to this list" });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
