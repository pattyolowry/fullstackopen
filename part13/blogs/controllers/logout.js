const router = require("express").Router();
const { tokenExtractor } = require("../utils/middleware");
const { Session } = require("../models");

router.delete("/", tokenExtractor, async (req, res) => {
  const session = await Session.findOne({
    where: {
      blogUserId: req.user.id,
    },
  });

  if (!session) {
    return res.status(404).end();
  }

  session.destroy();

  res.status(204).end();
});

module.exports = router;
