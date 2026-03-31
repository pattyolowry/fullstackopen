const router = require("express").Router();

const { BlogUser, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await BlogUser.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ["blogUserId"],
      },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await BlogUser.create(req.body);
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.put("/:username", async (req, res) => {
  const user = await BlogUser.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (user) {
    user.name = req.body.name;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
