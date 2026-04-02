const router = require("express").Router();
const bcrypt = require("bcrypt");
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
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    const user = await BlogUser.create({
      username: req.body.username,
      name: req.body.name,
      passwordHash: passwordHash,
    });
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
