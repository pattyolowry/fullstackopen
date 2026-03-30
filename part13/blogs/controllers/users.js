const router = require("express").Router();

const { BlogUser } = require("../models");

router.get("/", async (req, res) => {
  const users = await BlogUser.findAll({});
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await BlogUser.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
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
