const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

const errorHandler = (error, _req, response, next) => {
  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({
      error: {
        errors: error.errors.map((e) => e.message),
      },
    });
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: "Invalid request parameters" });
  } else if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Unable to parse request body" });
  } else if (error.message) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  blogFinder,
  errorHandler,
};
