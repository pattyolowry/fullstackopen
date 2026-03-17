const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const redis = require("../redis");
const { Todo } = require("../mongo");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

const initializeRedisCache = async () => {
  const count = await Todo.countDocuments({});
  await redis.set("added_todos", count);
};

initializeRedisCache();

router.get("/statistics", async (req, res) => {
  const count = await redis.get("added_todos");
  res.send({
    added_todos: Number(count),
  });
});

module.exports = router;
